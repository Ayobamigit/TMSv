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

//Institution
export const CREATE_INSTITUTION = 'CREATE_INSTITUTION'
export const UPDATE_INSTITUTION = 'UPDATE_INSTITUTION'
export const VIEW_INSTITUTION = 'VIEW_INSTITUTION'
export const DELETE_INSTITUTION = 'DELETE_INSTITUTION'
export const VIEW_INSTITUTION_INSTITUTION = 'VIEW_INSTITUTION_INSTITUTION'
export const UPDATE_INSTITUTION_INSTITUTION = 'UPDATE_INSTITUTION_INSTITUTION'
export const CREATE_INSTITUTION_ADMIN = 'CREATE_INSTITUTION_ADMIN'

//Terminals
export const CREATE_TERMINALS = 'CREATE_TERMINALS'
export const VIEW_TERMINALS = 'VIEW_TERMINALS'
export const UPDATE_TERMINALS = 'UPDATE_TERMINALS'
export const DELETE_TERMINALS = 'DELETE_TERMINALS'

//Global Settings
export const GLOBAL_SETTINGS = 'GLOBAL_SETTINGS'

//Roles
export const CREATE_ROLES = 'CREATE_ROLES'
export const VIEW_ROLES = 'VIEW_ROLES'
export const UPDATE_ROLES = 'UPDATE_ROLES'
export const DELETE_ROLES = 'DELETE_ROLES'

//Service Providers
export const CREATE_PROVIDERS = 'CREATE_PROVIDERS'

//Profiles
export const CREATE_PROFILES = 'CREATE_PROFILES'
export const UPDATE_PROFILES = 'UPDATE_PROFILES'

//Wallets
export const CREATE_WALLET = 'CREATE_WALLET'
export const UPDATE_WALLET = 'UPDATE_WALLET'
export const VIEW_WALLET = 'VIEW_WALLET'

//Users
export const CREATE_USER = 'CREATE_USER'
export const VIEW_USER = 'VIEW_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const DELETE_USER = 'DELETE_USER'

//Transactions
export const VIEW_TRANSACTIONS = 'VIEW_TRANSACTIONS'

//Permissions
export const VIEW_PERMISSIONS = 'VIEW_PERMISSIONS'

//Audit
export const VIEW_AUDIT = 'VIEW_AUDIT'
export const VIEW_INSTITUTION_AUDIT = 'VIEW_INSTITUTION_AUDIT'
export const VIEW_USER_AUDIT = 'VIEW_USER_AUDIT'


