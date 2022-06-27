import firebaseApp from '../firebase/app'

export const getuserinfo = (email) => {
    return dispatch =>{
        dispatch({
            type: 'USER_GET',
            status: 'GET_LOADING',
            loading: true
        })
        if(email !== ''){
        const userRef = firebaseApp.database().ref(`/users/${email.replace('.', '_')}`)
        userRef.on('value',snapshot=>{
            let user = snapshot.val()
            dispatch({
                type: 'USER_GET',
                status: 'GET_SUCCESS',
                ...user,
                loading: false
            })
        }, err=>{
            dispatch({
                type: 'USER_GET',
                status: 'GET_FAILED',
                loading: false
            })
        })
    }
    }
}
