const baseUrl = () => {
     return 'http://10.2.2.47:5334';
    //  return 'http://test.3lineng.com:5334';
    // return 'http://10.9.8.102:8081'; // Another Test IP
    // return 'http://10.9.8.63:7070'; //Test IP
    // return 'http://10.9.8.63:5334'; //Live IP
    // return 'http://41.219.149.51:5334'; //Test Public IP
    // return 'http://medusa.3lineng.com'; //New Public IP
}
 
export const institutionLoginUrl = `${baseUrl()}/api/v1/institution/login`;

//Dashboard 
export const transactionsHistoryURL = `${baseUrl()}/api/v1/transactions/tranHistory`;
// export const institutionTransactionsHistoryURL = `${baseUrl()}/api/v1/InstitutionTransactions`;
export const dashboardUtilities = `${baseUrl()}/api/v1/dashboard/DashboardUtilities`;
export const getNewTokenUrl = `${baseUrl()}/api/v1/superadmin/gettoken`;
export const getTransactionByIdUrl = `${baseUrl()}/api/v1/transactions/id`;

//Terminal Management
export const allTerminals = `${baseUrl()}/api/v1/tms/terminals`;
export const institutionTerminals = `${baseUrl()}/api/v1/tms/Institutionterminals`;
export const registerTerminalURL = `${baseUrl()}/api/v1/tms`;
export const uploadTerminalsURL = `${baseUrl()}/api/v1/tms/upload`;
export const viewATerminal = `${baseUrl()}/api/v1/tms/terminalID`;
export const updateATerminal = `${baseUrl()}/api/v1/tms/updateTerminals`;
export const getProfilesByServiceProviderName = `${baseUrl()}/api/v1/tms/getprofilesByInstitutionName`;

// Institution Management
export const registerInstitutionURL = `${baseUrl()}/api/v1/institution/createinstitution`;
export const viewAnInstitution = `${baseUrl()}/api/v1/institution/institutionID`;
export const updateAnInstitution = `${baseUrl()}/api/v1/institution/updateInstitution`;
export const getBanks = `${baseUrl()}/api/v1/serviceProviders/banks`;
export const allInstitutions = `${baseUrl()}/api/v1/institution/institutionsList`;
export const allInstitutionsList = `${baseUrl()}/api/v1/institution/getinstitutions`;
export const createInstitutionUser = `${baseUrl()}/api/v1/institution/createInstitutionUser`;
//export const getInstitutionTerminals = `${baseUrl()}/api/v1/institution/institutionTerminalList`
export const getInstitutionTerminals = `${baseUrl()}/api/v1/tms/Institutionterminals`
export const getInstitutionPermissions = `${baseUrl()}/api/v1/rolePermissions/getAllInstitutionPermissions`
export const getAInstitutionUser = `${baseUrl()}/api/v1/institution/getInstitutionUserbyID`
export const getInstitutionSetting = `${baseUrl()}/api/v1/institution/getInstitutionGlobalSettings`
export const updateGlobalSettings = `${baseUrl()}/api/v1/institution/updateInstitutionGlobalSettings`

// Create Wallet
export const allWalletsList = `${baseUrl()}/api/v1/walletAccount/getallWallets`;
export const getAWalletURL = `${baseUrl()}/api/v1/walletAccount/getwalletbywalletid`;
export const updateWalletInformation = `${baseUrl()}/api/v1/walletAccount/updateWalletAccount`;

// Configurations
export const allServiceProviders = `${baseUrl()}/api/v1/serviceProviders`;
export const addServiceProviders = `${baseUrl()}/api/v1/serviceProviders/addProviders`;
export const getServiceProviderById = `${baseUrl()}/api/v1/serviceProviders/getserviceProvider`;
export const addProfiles = `${baseUrl()}/api/v1/serviceProviders/addProfiles`;
export const getProfileById = `${baseUrl()}/api/v1/serviceProviders/profiles`;
export const editProfile = `${baseUrl()}/api/v1/serviceProviders/editprofiles`;
export const editProviders = `${baseUrl()}/api/v1/serviceProviders/providers`;
export const deleteServiceProviderById = `${baseUrl()}/api/v1/serviceProviders/deleteServiceProvider`;
export const deleteProfileById = `${baseUrl()}/api/v1/serviceProviders/deleteProfile`;
export const getProfilesByServiceProviderId = `${baseUrl()}/api/v1/serviceProviders/profilesbyProvidersID`;

//Roles and Permissions
export const getRolesAndPermissions = `${baseUrl()}/api/v1/rolePermissions`;
export const addPermissionsUrl = `${baseUrl()}/api/v1/rolePermissions/addPermissions`;
export const deletePermissions = `${baseUrl()}/api/v1/rolePermissions/deletePermissions`;
export const updatePermissions = `${baseUrl()}/api/v1/rolePermissions/updatePermissions`;
export const addRoles = `${baseUrl()}/api/v1/rolePermissions/addRoles`;
export const deleteRoles = `${baseUrl()}/api/v1/rolePermissions/deleteRoles`;
export const editRoles = `${baseUrl()}/api/v1/rolePermissions/editRoles`;
export const getAllPermissions = `${baseUrl()}/api/v1/rolePermissions/getAllPermissions`;

// SuperAdmin
export const superAdminLoginUrl = `${baseUrl()}/api/v1/superadmin/login`;
export const superAdminGetAllUsers = `${baseUrl()}/api/v1/superadmin/sgetAllUsers`;
export const viewAUser = `${baseUrl()}/api/v1/superadmin/users/id`;
export const createAUser = `${baseUrl()}/api/v1/superadmin/createUsers`;
export const deleteAUser = `${baseUrl()}/api/v1/superadmin/user`;
export const globalSettings = `${baseUrl()}/api/v1/superadmin/globalSettings`;
export const getGlobalSettings = `${baseUrl()}/api/v1/superadmin/getSetting`;