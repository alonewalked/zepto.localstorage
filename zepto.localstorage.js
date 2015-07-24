;(function($){
    var data = {};
    var storage = {
        getItem : function(key) {
            return data[key];
        },
        setItem : function(key, value) {
            data[key] = value;
        },
        removeItem : function(key) {
            delete data[key];
        }
    };
    var hasLS = (function() {
        // note: safari隐私模式下可以访问到window.localStorage对象，但是不能正常读写
        var flag = false;
        try {
            var LS = window.localStorage;
            LS.setItem('_Q_test_', 1);
            LS.removeItem('_Q_test_');
            flag = true;
        }
        catch(e) {}
        return flag;
    })();
    var ls = (function() {
        if(hasLS){
            return window.localStorage;
        }
        else{
            return storage;
        }
    })();
    $.fn.ls = {
        hasLocalStorage:hasLS,
        getStorage : function(){
            return ls;
        },
        read : function(key) {
            return ls.getItem(key);
        },
        write : function(key, value) {
            ls.setItem(key, value);
        },
        remove : function(key) {
            ls.removeItem(key);
        },
        keys:function(){
            return Object.keys(ls);
        }
    }
})(Zepto)