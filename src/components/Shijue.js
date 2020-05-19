import React from 'react'
import { Button } from 'antd';
import { ApiTwoTone,StarOutlined, StarFilled, StarTwoTone ,MessageOutlined,VideoCameraOutlined } from '@ant-design/icons';
//和redux连接
import {connect} from 'react-redux'
//获取更多数据
import {loadShijueAction}  from '../store/actions/loadShijue'

class Shijue extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            speed:15,
            position:[10.2,15,13.6]
         };
    }

    componentDidMount(){
        //获取视觉数据
        this.props.dispatch(loadShijueAction);
    }

    render() {

        let shijueList = this.props.shijueReducer.shijueData;
        console.log(shijueList)
        return (
            <div className='shijue'>
                <div className="IP">
                    <div className="chujue-icon"> 
                      <VideoCameraOutlined /> &nbsp;视觉信息显示
                    </div>
                      <div className="chujue-ip"> 
                        视觉IP地址：<input type='text'/>端口号：<input type='text'/><button>连接</button>
                      </div>
                </div>
                <div className="shijue-context">
                    <div className="shijue-video">
                        <div className="shijue-video-context">
                          我是内容
                        </div>
                        <div className="shijue-result">目标空间坐标：
                            {
                                this.state.position.map((value,key)=>{
                                    return <span key={key}>{value}&nbsp;&nbsp;</span>
                                })
                            }
                        </div>
                    </div>
                    <div className="shijue-model">
                    
                        <div className="shijue-model-context">
                          我是内容
                        </div> 
                        <div className="shijue-result">目标相对转速：{this.state.speed}°/s</div>
                    </div>
                  </div>
            </div>
        );
    }
}
//返回redux的触觉数据状态
const mapStateToProps = (state /*, ownProps*/) => {
    return {
        //注意：这里面的属性名要和reducers下Index的属性名一致
        shijueReducer: state.shijueReducer,
    }
  }
  
export default connect(mapStateToProps)(Shijue);
