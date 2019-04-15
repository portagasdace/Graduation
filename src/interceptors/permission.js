import router from '../router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
router.beforeEach((to, from, next) => {
    var userinfo = sessionStorage.getItem('userInfo');
    console.log(to.path)
    if(to.fullPath == '/') {
        next();
        // NProgress.done()
    }
    else{
        if(userinfo){
            next();
            // NProgress.start()
        }else{
            // NProgress.start()
            next({
                path:'/'
            })

        }
    }

})
router.afterEach(() => {
    NProgress.done()
})