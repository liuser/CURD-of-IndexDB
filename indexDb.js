(function(){
    var dbObject = {};
    /**
     *
     * @param params.db_name  数据库名称
     * @param params.db_version 数据库版本
     * @param params.db_store_name 存储空间名称,相当于数据表
     */
    dbObject.init = function(params){
        this.db_name = params.db_name;
        this.db_version = params.db_version;
        this.db_store_name = params.db_store_name;
        if (!window.indexedDB) {
            window.alert("你的浏览器不支持IndexDB,请更换浏览器")
        }
        var request = indexedDB.open(this.db_name,this.db_version);
        //打开数据失败
        request.onerror = function(event) {
            //打开数据库失败
            alert("不能打开数据库,错误代码: " + event.target.errorCode);
        };
        request.onupgradeneeded = function(event) {
            this.db = event.target.result;
            //创建一个存储空间,可以理解为数据库的表
            //根据需要请自行添加主键\自增\索引等
            //此处为空,存储id应自行添加
            this.db.createObjectStore(dbObject.db_store_name);
        };
        //打开数据库
        request.onsuccess = function(event) {
            //此处采用异步通知. 在使用curd的时候请通过事件触发
            dbObject.db = event.target.result;
        };
    };
    /**
     * 增加和编辑操作
     * @param params 值
     * @param key   id
     */
    dbObject.put = function(params,key){
        //此处须显式声明事物
        var transaction = dbObject.db.transaction(dbObject.db_store_name, "readwrite");
        var store = transaction.objectStore(dbObject.db_store_name);
        var request = store.put(params,key);
        request.onsuccess = function(){
            alert('添加成功');
        };
        request.onerror = function(event){
            console.log(event);
        }
    };
    /**
     * 删除数据
     * @param id 自增id
     */
    dbObject.delete = function(id){
        // dbObject.db.transaction.objectStore is not a function
        request = dbObject.db.transaction(dbObject.db_store_name, "readwrite").objectStore(dbObject.db_store_name).delete(id);
        request.onsuccess = function(){
            alert('删除成功');
        }
    };

    /**
     * 查询操作
     * @param key 主键key ,如果省略则查询全部
     */
    dbObject.select = function(key){
        //第二个参数可以省略
        var transaction = dbObject.db.transaction(dbObject.db_store_name,"readwrite");
        var store = transaction.objectStore(dbObject.db_store_name);
        if(key)
            var request = store.get(key);
        else
            var request = store.getAll();

        request.onsuccess = function () {
            console.log(request.result);
        }
    };
    /**
     * 清除整个对象存储(表)
     */
    dbObject.clear = function(){
        var request = dbObject.db.transaction(dbObject.db_store_name,"readwrite").objectStore(dbObject.db_store_name).clear();
        request.onsuccess = function(){
            alert('清除成功');
        }
    };


    /**
     * !!!!废弃,更新操作移至put方法
     * 更新数据
     * @param params
     * @param key
     */
    dbObject.update = function(params,key){
        //@ https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/put
        /**
         * 更新比较麻烦,虽然存储是按照key:value存储,其实在设置索引的时候就知道,INDEX.DB是按照一个字段字段去索引的.
         * 所以这里其实也是按照一个一个的去修改的
         */
        var store = dbObject.db.transaction(dbObject.db_store_name,"readwrite").objectStore(dbObject.db_store_name);
        var request = store.get(key);
        request.onsuccess= function(){
            //获取该key的数据
            var data = request.result;
            for (key in params) {
                console.log(key);
                data[key] = params[key];
            }
            var updateTitleRequest = store.put(data);
            updateTitleRequest.onsuccess = function() {
                alert('更新成功');
            };
        };
    };
    window.dbObject = dbObject;
})();