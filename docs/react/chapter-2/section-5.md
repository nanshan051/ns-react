---
title: 收集表单数据
comments: true
tags:
  - 受控组件
  - 非受控组件
  - 高阶函数
  - 柯里化
---

## 1. 非受控组件

现用现取：用的时候再去获取元素的值。需要先获取元素（此例使用 `ref` ），再获取元素的值。

```js{4-9,16-19}
class Login extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    // 从组件实例身上获取元素
    const { userName, password } = this;
    // 获取元素的值
    console.log(
      `你输入的账号是：${userName.value}，你输入的密码是：${password.value}`,
    );
  };
  render() {
    return (
      <form action="http://www.baidu.com" onSubmit={this.handleSubmit}>
        账号：
        <input
          ref={(c) => {
            // 将元素挂在组件实例身上
            this.userName = c;
          }}
          type="text"
          name="userName"
        />
        <br />
        密码：
        <input
          ref={(c) => {
            this.password = c;
          }}
          type="password"
          name="password"
        />
        <br />
        <button>提交</button>
      </form>
    );
  }
}
ReactDOM.render(<Login />, document.getElementById("test"));
```

## 2. 受控组件

随着输入内容变化，将最新的内容存放在 `state` 中，用的时候直接从 `state` 取值即可。

::: tip
优点：**省略了 `ref`** 。（不要滥用 ref ）
:::

```jsx{4-8,14-15,21}
class Login extends React.Component {
  // 数据初始化
  state = { userName: "", password: "" };
  // 数据发生变化时，在state中进行更新
  saveUserName = (event) => {
    console.log(event.target.value);
    this.setState({ userName: event.target.value });
  };
  savePassword = (event) => {
    this.setState({ password: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    // 从state中读取最新数据
    const { userName, password } = this.state;
    console.log(`你输入的账号是：${userName}，你输入的密码是：${password}`);
  };
  render() {
    return (
      <form action="http://www.baidu.com" onSubmit={this.handleSubmit}>
        账号：<input type="text" name="userName" onChange={this.saveUserName} />
        密码：<input type="password" name="password" onChange={this.savePassword} />
        <button>提交</button>
      </form>
    );
  }
}
ReactDOM.render(<Login />, document.getElementById("test"));
```

<img class="zoomable" :src="$withBase('/images/screenshot/react/2/5/1.png')" alt="screenshot">

## 3.高阶函数和柯里化

上面的受控组件中，用于保存数据的函数 saveUserName 和 savePassword 重复度较高，如果表单项很多时，耦合性会很高。

可以通过高阶函数和柯里化进行优化。

::: tip 高阶函数

如果一个函数符合下面 2 个规范中的任何一个，那该函数就是高阶函数。

1. 函数接收的 **参数是一个函数** 。
2. 函数 **返回值是一个函数** 。

常见的高阶函数有 `setTimeout`、数组的常用方法 `map`、`filter`、`forEach` 等。
:::

::: tip 柯里化
**通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理** 的函数编码形式。
:::

```jsx{6-13,26,32}
class Login extends React.Component {
  state = {
    userName: "",
    password: "",
  };
  saveFormData = (dataType) => {
    // 这里用到了高阶函数和柯里化，通过两次接收参数（第一次dataType，第二次event），最后统一处理
    // 返回的新函数才是真正的事件回调
    return (event) => {
      console.log(dataType, event.target.value);
      this.setState({ [dataType]: event.target.value });
    };
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { userName, password } = this.state;
    console.log(`你输入的账号是：${userName}，你输入的密码是：${password}`);
  };
  render() {
    return (
      <form action="http://www.baidu.com" onSubmit={this.handleSubmit}>
        账号：
        <input
          type="text"
          name="userName"
          onChange={this.saveFormData("userName")}
        />
        密码：
        <input
          type="password"
          name="password"
          onChange={this.saveFormData("password")}
        />
        <button>登录</button>
      </form>
    );
  }
}
ReactDOM.render(<Login />, document.getElementById("test"));
```

<img class="zoomable" :src="$withBase('/images/screenshot/react/2/5/2.png')" alt="screenshot">

## 4. 不用柯里化的实现

可以在标签中给事件指定一个 **箭头函数作为回调** ，实现一次传递多个值。

```jsx{6-9,23}
class Login extends React.Component {
  state = {
    userName: "",
    password: "",
  };
  // 一次接收多个值，统一处理
  saveFormData = (dataType, event) => {
    this.setState({ [dataType]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { userName, password } = this.state;
    console.log(`你输入的账号是：${userName}，你输入的密码是：${password}`);
  };
  render() {
    return (
      <form action="http://www.baidu.com" onSubmit={this.handleSubmit}>
        账号：
        {/*回调为箭头函数，在箭头函数中调用真正的处理函数*/}
        <input
          type="text"
          name="userName"
          onChange={(event) => this.saveFormData("userName", event)}
        />
        密码：
        <input
          type="password"
          name="password"
          onChange={(event) => this.saveFormData("password", event)}
        />
        <button>登录</button>
      </form>
    );
  }
}
ReactDOM.render(<Login />, document.getElementById("test"));
```
