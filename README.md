什么是IndexDb？
The Indexed Database API, or IndexedDB (formerly WebSimpleDB), is a W3C recommended web browser standard interface for a transactional local database of JSON objects collections with indices. W3C issued its final recommendation for the IndexedDB interface on January 8, 2015.
很抱歉，我没找到中文的注解。

如何使用？
1、将indexDb.js引入
2、使用 dbObject.init({'database1'},'version1','table1'});初始化数据库、表
并获取全局dbObject对象
3、使用dbObject.put(jsonObject,id,'add')来插入数据
4、使用dbObject.put(jsonObject,id,'update')来更新数据
5、使用dbObject.delect(id)来删除数据
6、使用dbObject.select(key)来获取数据,key不存在则获取所有数据
7、使用dbObject.clear()来删除表内所有数据

