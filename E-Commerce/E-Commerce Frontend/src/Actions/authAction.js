import FirebaseApp from '../firebase/app'


export const authenticate = (username, password) =>{
    return (dispatch) => {
        dispatch({
            type: 'USER_AUTH',
            loading: true,
            data:[],
            user: {
                uname: username
            }
        })
        FirebaseApp.auth().signInWithEmailAndPassword(username, password)
            .then(credential=>{
                dispatch({
                    type: 'USER_AUTH',
                    auth: true,
                    loading: false,
                    loginfailed: false,
                    user: {
                        uname: credential.user.email
                    }
                })
            }, val=>{
                dispatch({
                    type: 'USER_AUTH',
                    auth: false,
                    loading: false,
                    loginfailed: true,
                    user: {
                        uname: username
                    }
                })
            })
    }
}
