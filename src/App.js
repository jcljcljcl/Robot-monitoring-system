import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import routes from './model/router'
//布局组件
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;



function App() {
  return (
    <Router>
      <div className="app">
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1"> <Link to='/'>首页</Link></Menu.Item>
            <Menu.Item key="2"> <Link to='/shijue'>视觉信息</Link></Menu.Item>
            <Menu.Item key="3"> <Link to='/chujue'>触觉信息</Link></Menu.Item>
          </Menu>
        </Header>
        <Content className="site-layout" style={{ padding: '0 5px', marginTop: 54 }}>
          <div className="site-layout-background" style={{ padding: 10, minHeight: 500 }}>
          {
                  routes.map((route,key)=>{
                    if(route.exact){
                      // 当存在路由嵌套时候，利用下面的写法将子路由中的子路由传递过去
                      return <Route exact key={key} path={route.path} 
                        render={props=>(
                          <route.component {...props} routes={route.routes}/>
                        )}
                      ></Route>
                    }else{
                      return <Route key={key} path={route.path} 
                        render={props=>(
                          <route.component {...props} routes={route.routes}/>
                        )}
                      ></Route>
                    }
                  })
            }
          </div>
        </Content>
        <Footer  style={{ textAlign: 'center'}}>
          <h4>设备健康实验室</h4>
        </Footer>
      </Layout>
      </div>
    </Router>
  );
}
export default App;
