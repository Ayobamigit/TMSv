const baseUrl = () => {
    if (process.env.NODE_ENV === 'production') {
        return 'http://10.2.2.47:5334'
    } else {
        return 'http://10.2.2.47:5334'
    }
}
 
export const institutionLoginUrl = `${baseUrl()}/api/v1/login`;
export const superAdminLoginUrl = `${baseUrl()}/api/v1/superadmin/login`;