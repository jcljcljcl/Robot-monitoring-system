import React from 'react'
import { RedditOutlined } from '@ant-design/icons';
import { Select } from 'antd';
//和redux连接
import {connect} from 'react-redux'
//获取更多数据
import {loadChujueAction}  from '../store/actions/loadChujue'
//导入echarts
import echarts from 'echarts'
//导入封装好的防抖函数
import debounce from '../util.js'

const { Option } = Select;

class Chujue extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
          tongdao:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
          //单通道内容
          option_dan:{
            xAxis: {
                type: 'category',
                data: []
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [],
                type: 'line',
                smooth: true
            }]

        },

        //24通道内容
        option_24:{
          xAxis: {
              type: 'category',
              data: ['1', '2', '3', '4', '5', '6', '7','8', '9', '10', '11', '12', '13', '14','15', '16', '17', '18', '19', '20', '21','22', '23', '24']
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: [],
              type: 'line',
              smooth: true
          }]
      },
        //ip及port
        ip:"",
        port:"",
        address:""
      };
      this.isIpLegal = debounce(this.isIpLegal, 1000)//调用设定好的防抖方法
      this.isPortLegal = debounce(this.isPortLegal, 1000)//调用设定好的防抖方法
    }

    componentDidMount(){
      //获取触觉数据

      this.props.dispatch(loadChujueAction);
      let chujueList = this.props.chujueReducer.chujueData;
      //加载折线图
      var myChart = echarts.init(document.getElementById('chujue-dan-context'));
      for(let i in chujueList){
        if(chujueList[i].flag == 1){
          this.state.option_dan.series[0].data.push(chujueList[i].pow)
          var time = chujueList[1].time
          //将字符串按照空格分割
          var arr = time.split(" ");//以空格分开
          this.state.option_dan.xAxis.data.push(arr[i])
        }
      }
      myChart.setOption(this.state.option_dan)

      var myChart1 = echarts.init(document.getElementById('chujue-24-context'));
      //改变数据
      for(let i in chujueList){
        this.state.option_24.series[0].data.push(chujueList[i].pow)
      }
      myChart1.setOption(this.state.option_24)
    }
    

    handleChange=(value)=>{
      let chujueList = this.props.chujueReducer.chujueData;
        var num =Number(`${value}`)
        this.state.option_dan.series[0].data=[]
        this.state.option_dan.xAxis.data=[]
        for(let i in chujueList){
          if(chujueList[i].flag == num){
            this.state.option_dan.series[0].data.push(chujueList[i].pow)
            var time = chujueList[i].time
            //将字符串按照空格分割
            var arr = time.split(" ");//以空格分开
            this.state.option_dan.xAxis.data.push(arr[1])
          }
        }
        console.log( this.state.option_dan.series[0].data)
        var myChart = echarts.init(document.getElementById('chujue-dan-context'));
        myChart.setOption(this.state.option_dan)
      }
    
    //用户输入IP和端口号后，点击链接后调用该函数
    connect=(ip)=>{
      this.setState({
          address:"http://"+this.state.ip+":"+this.state.port
      })
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
    
        return (
            <div>

                <div className="IP">
                  <div className="chujue-icon"> 
                    <RedditOutlined />&nbsp;触觉信息显示 
                  </div>
                    <div className="chujue-ip"> 
                      触觉IP地址：<input type='text' onChange={this.ipGet}/>端口号：<input type='text' onChange={this.portGet}/><button onClick={this.connect}>连接</button>
                    </div>
                </div>

                <div className="chujue-context">
                  <div className="chujue-dan">
                      <span className="chujue-dan-title">单通道受力曲线</span>&nbsp;&nbsp;&nbsp;
                      <span>
                         <Select defaultValue="1" style={{ width: 80}} onChange={this.handleChange}>
                        {
                          this.state.tongdao.map((value,key)=>{
                            return <Option key={key} value={value}>{value}</Option>
                          })
                        }
                      </Select>
                      </span>
                      <div className="chujue-dan-context" id="chujue-dan-context">
                        我是内容
                      </div>
                  </div>
                  <div className="chujue-24">
                      <span className="chujue-24-title">24路受力曲线</span>
                      <div className="chujue-24-context" id="chujue-24-context">
                        我是内容
                      </div>
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
      chujueReducer: state.chujueReducer,
  }
}

export default connect(mapStateToProps)(Chujue);