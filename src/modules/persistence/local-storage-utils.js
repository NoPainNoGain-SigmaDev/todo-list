export const saveUserData = (user) =>{
    localStorage.clear();
    const userData = JSON.stringify(user.getSerializableData());
    console.log(user.getSerializableData())
    console.log(userData)
    localStorage.setItem("SAVED_USER", userData);
}