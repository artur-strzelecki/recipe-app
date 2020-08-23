import { 
    HOME_DATA,
    LOADED_HOME,
    LIST_LOADED,
    LIST_DATA,
    FAV_DATA,
    FAV_LOADED,
    } from './typesData';
import firebase from 'firebase';



export const homeData = () => {
    return (dispatch) => {
        dispatch({type: LOADED_HOME});
        firebase.database().ref().child('foods').orderByChild('createdAt').limitToLast(5).on('value', (snapshot) =>{
            let check = snapshot.exists();
            let li = [];
            if (check)
            {
                snapshot.forEach((snap) => {
                    let item = snap.val();
                    item.key = snap.key;
                    li.push(item);
                })
            }
            dispatch({type: HOME_DATA, payload: li});
      })
    };
};

export const listData = (categID) => {
    return (dispatch) => {
        dispatch({type: LIST_LOADED});
        firebase.database().ref().child('foods').orderByChild('category').equalTo(categID).on('value', (snapshot) =>{
            let check = snapshot.exists();
            let li = [];
            if (check)
            {
                snapshot.forEach((snap) => {
                    let item = snap.val();
                    item.key = snap.key;
                    li.push(item);
                })
            }
            dispatch({type: LIST_DATA, payload: li});
      })
    };
};

export const favData = () => {
    return (dispatch) => {
        dispatch({type: FAV_LOADED});
        let user = firebase.auth().currentUser.uid;
        let li = [];
        firebase.database().ref().child(`favourite/${user}/`).once('value').then(snapshot => {
            let check = snapshot.exists();
            if (check)
            {     
                 snapshot.forEach((snap) => {
                    firebase.database().ref().child('foods').orderByKey().equalTo(snap.val().id).once('value').then(snapshot2 =>{
                     snapshot2.forEach((snapItem) => {
                       let item = snapItem.val();
                       item.key = snapItem.key;
                       li.push(item); 
                     })
                     dispatch({type: FAV_DATA, payload: li});  
                 })
               })
            } else
            {
                dispatch({type: FAV_DATA, payload: li});  
            }
            
        });
    }
};
