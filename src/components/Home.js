import React from 'react'
import 'antd/dist/antd.css'
import { Menu } from 'antd';
import { AppstoreOutlined, CameraOutlined, SettingOutlined } from '@ant-design/icons';
//和redux连接
import {connect} from 'react-redux'
//获取更多数据
import {loadChujueAction}  from '../store/actions/loadChujue'
import {loadShijueAction}  from '../store/actions/loadShijue'
const { SubMenu } = Menu;



class Home extends React.Component {

    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    constructor(props) {
        super(props);
        console.log(props)
        this.state = { 
            openKeys: ['sub1'],
         };
    }

    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.setState({ openKeys });
        } else {
          this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
          });
        }
      };

    componentDidMount(){
        //获取更多数据
        this.props.dispatch(loadChujueAction);
        this.props.dispatch(loadShijueAction);
    }


    render() {
       
        let chujueList = this.props.chujueReducer.chujueData;
      
        let shijueList = this.props.shijueReducer.shijueData;
        console.log(chujueList)
        console.log(shijueList)
        const chujueData = chujueList.map((value,key)=>{
            return <li key = {key}>{value.time}</li>
        })
        

        const shijueData = shijueList.map((value,key)=>{
            return <li key = {key}>{value.speeds}</li>
        })
        return (
            <div>
            {/* <ul>{chujueData}</ul>
            <ol>{shijueData}</ol> */}
         
            <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                style={{ width: 200 }}
            >
                <SubMenu
                key="sub1"
                title={
                    <span>
                    <CameraOutlined /> 
                    <span>实时监测</span>
                    </span>
                }
                >
                <Menu.Item key="1">监测总览</Menu.Item>
                <Menu.Item key="2">视觉监测</Menu.Item>
                <Menu.Item key="3">触觉监测</Menu.Item>
                </SubMenu>
                <SubMenu
                key="sub2"
                title={
                    <span>
                    <AppstoreOutlined />
                    <span>历史回顾</span>
                    </span>
                }
                >
                <Menu.Item key="5">历史视频</Menu.Item>
                <Menu.Item key="6">历史信息显示</Menu.Item>
                </SubMenu>
                <SubMenu
                key="sub4"
                title={
                    <span>
                    <SettingOutlined />
                    <span>设置</span>
                    </span>
                }
                >
                <Menu.Item key="9">用户设置</Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    );
    }
}

//返回redux的couterReducer1状态
const mapStateToProps = (state /*, ownProps*/) => {
    return {
        //注意：这里面的属性名要和reducers下Index的属性名一致
        chujueReducer: state.chujueReducer,
        shijueReducer: state.shijueReducer
    }
}

export default connect(mapStateToProps)(Home);