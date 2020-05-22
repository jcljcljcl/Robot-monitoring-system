import React from 'react'
import { Button } from 'antd';
//导入video插件
import 'video.js/dist/video-js.css'
import 'videojs-flash'
import videojs from 'video.js'
import { ApiTwoTone,StarOutlined, StarFilled, StarTwoTone ,MessageOutlined,VideoCameraOutlined } from '@ant-design/icons';
//和redux连接
import {connect} from 'react-redux'
//获取更多数据
import {loadShijueAction}  from '../store/actions/loadShijue'
//导入封装好的防抖函数
import debounce from '../util.js'

class Shijue extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            speed:15,
            position:[10.2,15,13.6],
            ip:"",
            port:"",
            address:"rtmp://58.200.131.2:1935/livetv/hunantv"
         };
         this.isIpLegal = debounce(this.isIpLegal, 1000)//调用设定好的防抖方法
         this.isPortLegal = debounce(this.isPortLegal, 1000)//调用设定好的防抖方法
    }

    //组件挂载完成之后初始化播放控件
    componentDidMount(){
        //获取视觉数据
        this.props.dispatch(loadShijueAction);
        //挂载视觉播放控件
        const videoJsOptions = {
            autoplay: true,
            controls: true,
            sources: [{
              src:this.state.address,  //测试地址
              //src:"http://192.168.191.2:8080",   //机器人地址
              type: 'rtmp/flv'
            }]
          }
        this.player = videojs('my-video', videoJsOptions , function onPlayerReady() { 
            //(id或者refs获取节点，options，回调函数)
            videojs.log('Your player is ready!');
            // In this context, `this` is the player that was created by Video.js.
            this.play();
            // How about an event listener?
            this.on('ended', function() {
              videojs.log('Awww...over so soon?!');
            });
          }); 
    }

    //用户输入IP和端口号后，点击链接后调用该函数
    connect=(ip)=>{
       this.setState({
           address:"http://"+this.state.ip+":"+this.state.port
       })
       //地址改变后手动刷新video
       this.player.pause();
       this.player.src("rtmp://202.69.69.180:443/webcast/bshdlive-pc"); //测试地址
      // this.player.src(this.state.address);  //实际机器人地址
       this.player.load();
       this.player.play();
    }
   
    //获取用户输入的IP地址
    ipGet=(event)=>{
        this.isIpLegal(event.target.value) // 对用户输入进行判断
        this.setState({
            ip : event.target.value
        },()=>{
           // this.isPhoneLegal(event.target.value)
        })
    }
    isIpLegal  = (ip) => {
        console.log(ip)  // 防抖后获取的值
    } 
    //获取用户输入的port地址
    portGet=(event)=>{
        this.isPortLegal(event.target.value) // 对用户输入进行判断
        this.setState({
            port : event.target.value
        },()=>{
           // this.isPhoneLegal(event.target.value)
        })
    }
    isPortLegal= (port) => {
        console.log(port)  // 防抖后获取的值
    } 


    render() {
        //获取视觉数据
        let shijueList = this.props.shijueReducer.shijueData;
        console.log(shijueList)
        //video
        let li = {
            background: "cadetblue",
            padding: "11px",
            width: "fit-content",
            marginBottom:"5px",
            cursor:"pointer"
        }
        let playing = {
            background: "rgb(141, 182, 28)",
            padding: "11px",
            width: "fit-content",
            marginBottom:"5px",
            cursor:"pointer"
        }

        return (
            <div className='shijue'>
                <div className="IP">
                    <div className="chujue-icon"> 
                      <VideoCameraOutlined /> &nbsp;视觉信息显示
                    </div>
                      <div className="chujue-ip"> 
                        视觉IP地址：<input type='text' onChange={this.ipGet}/>端口号：<input type='text' onChange={this.portGet}/><button onClick={this.connect}>连接</button>
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
                        <video style={{width:"97%",height:"420px",marginRight:"10px",marginLeft:"10px",marginTop:"20px",marginBottom:"0"}} id="my-video" className="video-js vjs-default-skin">
                        </video>
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
