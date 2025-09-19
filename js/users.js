const LS_USERS='TECHNOVA_USERS';
const DEFAULT_USERS=[
    {id:1,nombre:'Admin',email:'admin@technova.com',rol:'admin',estado:1,creado_en:new Date().toISOString()}
];

function loadUsers(){
    const raw=localStorage.getItem(LS_USERS);
    if(!raw){
        localStorage.setItem(LS_USERS,JSON.stringify(DEFAULT_USERS));
        return[...DEFAULT_USERS]
    }
    try{
        return JSON.parse(raw)
    }catch{
        localStorage.setItem(LS_USERS,JSON.stringify(DEFAULT_USERS));
    return[...DEFAULT_USERS]}
}

function saveUsers(arr){localStorage.setItem(LS_USERS,JSON.stringify(arr))}

function getUser(id){
    return loadUsers().find(u=>String(u.id)===String(id))
}

function upsertUser(u){
    const arr=loadUsers();
    if(!u.id){
        u.id=Math.max(...arr.map(x=>x.id))+1;arr.push(u)
    }else{
        const i=arr.findIndex(x=>x.id===u.id);if(i>=0)arr[i]=u;else arr.push(u)
    }saveUsers(arr);
    return u.id
}

function deleteUser(id){
    saveUsers(loadUsers().filter(u=>String(u.id)!==String(id)))
}
