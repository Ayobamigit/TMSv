let { role } = JSON.parse(sessionStorage.getItem('userDetails'));
export const hasPermission = (neededRole) => {
    if(role.permissions){
        const result = role.permissions.find((item, i) => {
            return item.name.toLowerCase().includes(neededRole.toLowerCase())
        })
        if(result){
            return true
        } else {
            return false;
        }
    }
}

//Available Permissions
export const CREATE_INSTITUTION = 'CREATE_INSTITUTION'
export const CREATE_TERMINALS = 'CREATE_TERMINALS'
export const GLOBAL_SETTINGS = 'GLOBAL_SETTINGS'
export const CREATE_ROLES = 'CREATE_ROLES'
export const CREATE_PROVIDERS = 'CREATE_PROVIDERS'
export const CREATE_PROFILES = 'CREATE_PROFILES'
export const CREATE_WALLET = 'CREATE_WALLET'
export const CREATE_USER = 'CREATE_USER'
export const UPDATE_WALLET = 'UPDATE_WALLET'
export const VIEW_WALLET = 'VIEW_WALLET'