let login = document.getElementById('btn_login'); // 登录按钮
let regist = document.getElementById('btn_regist'); // 注册按钮
let loginout = document.getElementById('btn_loginout'); // 退出按钮（测试）

function fetchFn(ele,type,url,href){ // 注册|登录 请求函数
  /*
  * ele ： 调用元素
  * type ： 事件类型
  * url ： 请求地址
  * href ： 跳转路径
  * */

  ele.addEventListener(type, (e) => {
    let use = document.getElementsByName('name')[0].value; // 用户名
    let psd = document.getElementsByName('password')[0].value; // 用户密码

    fetch(url, {
      method: 'post',
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({"name": use, "password": psd})
    }).then((res) => {
      if (res.ok) {
        res.json().then(function (json) {
          console.log(json);
          if (json.code == '1') {
            console.log('登录失败！') // 可能还会有密码错误的提示
          }
          if (json.code == '200') {
            location.href = href;
          }
        })
      }
    })
  });
}

fetchFn(login,'click','http://interview.emicmh.com/login','home.html'); // 登录调用
fetchFn(regist,'click','http://interview.emicmh.com/signup','home.html'); //　注册调用

loginout.addEventListener('click', (e) => { // 登出操作
  fetch('http://interview.emicmh.com/logout', { // 地址应该是跳转之后的地址，我登录不进去，把网址换一下应该就可以了
    method: 'post',
    mode: "cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: ''
  }).then((res) => {
    if (res.ok) {
      res.json().then(function (json) {
        console.log('登出成功!');
        if (json.code == '200') {
          location.href = 'login.html';
        }
      })
    }
  })
});