# nutritionalDiet
NodeJS background processed for an Android app with nutritional diet 


#广东某工业大学Andriod课程设计
饮食建议系统：

本题要求学生实现基于中国食物营养数据库的饮食建议系统，可以对各种不同类型的食物包含的各种元素进行排序和展示；输入某人一天吃的各种食物，系统能给出该人的饮食是否合理，并给出建议。本题要求实现一个Android APP，但不对具体的技术进行要求，可以使用原生Android编程，也可以用Android与HTML混合编程实现。要求界面清爽，一目了然，让用户使用之后心情愉快。

#基本功能需求分析：

1. 本题要求学生实现基于中国食物营养数据库的饮食建议系统
2. 可以对各种不同类型的食物包含的各种元素进行排序和展示
3. 输入某人一天吃的各种食物，系统能给出该人的饮食是否合理
4. 并给出建议。


基本思路：Andriod端负责请求数据、处理node服务器返回的Json、显示数据。

#数据库设计

数据库类型：MySQL

数据库SQL数据以及设计在根目录database.sql中




#API协议区域
 

1. andriod json获取测试
	* 方式：GET
	* 地址：/json
	* 返回数据样式：{"no":"001","data":{"name":"cry","chinese":"陈荣源"}}

2. 食物“类别”获取
	* 方式：GET
	* 地址：/getcategory
	* 返回数据样式：
	* 
		* [{"id":1,"name":"谷类","isDel":0},{"id":2,"name":"薯类淀粉","isDel":0},{"id":3,"name":"干豆类","isDel":0},{"id":4,"name":"蔬菜类","isDel":0},{"id":5,"name":"菌藻类","isDel":0},{"id":6,"name":"水果类","isDel":0},{"id":7,"name":"坚果种子","isDel":0},{"id":8,"name":"畜肉类","isDel":0},{"id":9,"name":"禽肉类","isDel":0},{"id":10,"name":"乳类","isDel":0},{"id":11,"name":"蛋类","isDel":0},{"id":12,"name":"鱼虾蟹贝","isDel":0},{"id":13,"name":"婴幼儿食品","isDel":0}]


3. 食物列表获取
	* 方式：GET
	* 赋值：categoryID（食物类别ID），elementID（食物元素），rankID（up/down），pageNum（页数）
	* 地址：/getfood?category=categoryID&&element=elementID&&rank=rankID&&page=pageNum
	* 返回数据样式：
	* 
		* [{"id":69,"name":"桂花藕粉","heat":344,"protein":0.4,"fat":0.1,"vitaminC":0,"vitaminE":0,"vitaminB1":0,"vitaminB2":0.01,"Fe":20.8,"Zn":0.23,"Se":0.39,"category":2,"isDel":0},{"id":68,"name":"藕粉","heat":372,"protein":0.2,"fat":0,"vitaminC":0,"vitaminE":0,"vitaminB1":0,"vitaminB2":0.01,"Fe":17.9,"Zn":0.15,"Se":2.1,"category":2,"isDel":0},{"id":76,"name":"马铃薯粉","heat":337,"protein":7.2,"fat":0.5,"vitaminC":0,"vitaminE":0.28,"vitaminB1":0.08,"vitaminB2":0.06,"Fe":10.7,"Zn":1.22,"Se":1.58,"category":2,"isDel":0},{"id":80,"name":"甘薯粉[地瓜粉]","heat":336,"protein":2.7,"fat":0.2,"vitaminC":0,"vitaminE":0,"vitaminB1":0.03,"vitaminB2":0.05,"Fe":10,"Zn":0.29,"Se":2.62,"category":2,"isDel":0},{"id":71,"name":"粉丝","heat":335,"protein":0.8,"fat":0.2,"vitaminC":0,"vitaminE":0,"vitaminB1":0.03,"vitaminB2":0.02,"Fe":6.4,"Zn":0.27,"Se":3.39,"category":2,"isDel":0},{"id":73,"name":"粉条","heat":337,"protein":0.5,"fat":0.1,"vitaminC":0,"vitaminE":0,"vitaminB1":0.01,"vitaminB2":0,"Fe":5.2,"Zn":0.83,"Se":2.18,"category":2,"isDel":0},{"id":84,"name":"玉米淀粉","heat":345,"protein":1.2,"fat":0.1,"vitaminC":0,"vitaminE":0,"vitaminB1":0.03,"vitaminB2":0.04,"Fe":4,"Zn":0.09,"Se":0.7,"category":2,"isDel":0},{"id":79,"name":"甘薯片[白薯干]","heat":340,"protein":4.7,"fat":0.8,"vitaminC":9,"vitaminE":0.38,"vitaminB1":0.15,"vitaminB2":0.11,"Fe":3.7,"Zn":0.35,"Se":2.64,"category":2,"isDel":0},{"id":67,"name":"团粉[芡粉","heat":346,"protein":1.5,"fat":0,"vitaminC":0,"vitaminE":0,"vitaminB1":0.01,"vitaminB2":0,"Fe":3.6,"Zn":0.18,"Se":0.37,"category":2,"isDel":0},{"id":72,"name":"豌豆粉丝","heat":367,"protein":0.4,"fat":0,"vitaminC":0,"vitaminE":0,"vitaminB1":0.02,"vitaminB2":0,"Fe":3.5,"Zn":0.32,"Se":0,"category":2,"isDel":0}]

	* 数据条目：10（默认）

4. 消耗食物数据提交
	* 方式：post
	* 地址：/foodconsum
	* 返回数据样式：（待定）

5. 用户注册
	* 方式：Post
	* 地址：/resign
	* 密码加密方式：（待定）
	* 返回数据样式：（待定，情况：用户名存在，密码重复错误，注册成功）

6. 用户名是否存在查询
	* 方式：Get
	* 赋值：username（尝试注册的用户名）
	* 地址：/existusername?resign=username
	* 返回数据样式：
	* 
		* {'result':ture}表示用户名已存在（不能注册）
		* {'result':falue}表示用户名不存在（可以注册）


7. 用户登录（这个可以有）
	* 方式：Post
	* 地址：/login
	* 密码加密方式：（待定）
	* 返回数据样式：（待定，情况：用户名或者密码错误，登录成功）


