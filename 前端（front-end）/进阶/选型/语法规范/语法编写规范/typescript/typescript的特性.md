## typescript特性
# 1、类型
字符串（string）、数字（number）、布尔（boolean）、数组（array）、枚举、任意类型(any)、“空”类型（void）
# 注意点：数组类型的定义和枚举
```js
var jobs: Array<string> = ['IBM', 'Microsoft', 'Google'];
var jobs: string[] = ['Apple', 'Dell', 'HP'];

一般而言，我们很少会用到枚举。

枚举是一组可命名数值的集合。比如，如果我们想拿到某人的一系列角色，可以这么写：
enum Role {Employee, Manager, Admin};
var role: Role = Role.Employee;
默认情况下，枚举类型的初始值是0。我们也可以调整初始化值的范围：
enum Role {Employee = 3, Manager, Admin};
var role: Role = Role.Employee;
在上面的代码中， Employee 的初始值被设置为 3 而不是 0 。枚举中其他项的值是依次递增的，
意味着 Manager 的值为 4 ， Admin 的值为 5 。同样，我们也可以单独为枚举中的每一项指定值：
enum Role {Employee = 3, Manager = 5, Admin = 7};
var role: Role = Role.Employee;
```
# 2、类
类需要注意的是：
在TypeScript中，每个类只能有一个构造函数。这是违背ES6标准的。在ES6中，一个类可以拥有不同参数数量的多个构造函数重载实现。
# 3、注解
注解就是@ngModule{}、@component{}，这样的头部元信息
# 4、模块导入
# 5、语言工具包（比如，解构、箭头函数、模板字符串`${}`）
《方括号为输入，圆括号为输出》

## es6新增的js语言特性：
1、接口
2、泛型
3、模块的导入、导出
4、标注
5、解构（）