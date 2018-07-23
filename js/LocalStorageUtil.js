

var LocalStorageUtil = (function(){

    return{

        setItem : function(itemId,itemValue){
            localStorage.setItem( itemId , itemValue );
        },

        getItem : function(itemId){
            if( itemId === null || itemId.length === 0 ){
                return "";
            }
            var itemValue = localStorage.getItem(itemId);
            if( itemValue === null || itemValue.length === 0 ){
                return "";
            }
            return itemValue;
        },

    };
})();