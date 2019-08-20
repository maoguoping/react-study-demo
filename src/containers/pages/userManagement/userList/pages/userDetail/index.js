import React from 'react'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Descriptions, Tag, Input, Button, message } from 'antd'
import http from '../../../../../../utils/axios'
import api from '../../../../../../api'
import { getParams } from '../../../../../../utils/url'
import { actions as appActions } from '../../../../../../redux/modules/app'
import { roleListSelector } from '../../../../../../redux/modules/auth'
import './style.scss'
const mapStateToProps = state => {
    return {
        roleList: roleListSelector(state)
    }
};
const mapDispatchToProps = dispatch => {
    console.log('执行绑定')
    return {
        setError: bindActionCreators(appActions.setError, dispatch)
    }
};
class UserDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'edit',
            userDetailInfo: {
                username: '',
                userId: '',
                userTickname: '',
                roleId: []
            }
        }
    }
    changeUsername = (e) => {
        const userDetailInfo = this.state.userDetailInfo;
        this.setState({
            userDetailInfo: {
                ...userDetailInfo,
                username: e.target.value
            }
        });
    }
    changeUserTickname = (e) => {
        const userDetailInfo = this.state.userDetailInfo;
        this.setState({
            userDetailInfo: {
                ...userDetailInfo,
                userTickname: e.target.value
            }
        });
    }
    loadData() {
        let location = this.props.history.location;
        let params = getParams(location.search);
        http.get(api.getUserDetailById, {
            userId: params.userId
        }).then(res => {
            console.log(res);
            const data = res.data;
            this.setState({
                userDetailInfo: {
                    username: data.username,
                    userId: data.userId,
                    userTickname: data.userTickname,
                    roleId: data.roleId
                }
            })
        }).catch(err => {
            this.props.setError(err);
        })
    }
    saveData = () => {
        const {
            userId,
            username,
            userTickname
        } = this.state.userDetailInfo;
        if(!username) {
            message.warning('用户名不能为空!');
            return;
        }
        if(!userTickname) {
            message.warning('用户昵称不能为空!');
            return;
        }
        if (this.state.mode === 'edit') {
            http.get(api.setUserDetailById, {
                userId,
                username,
                userTickname
            }).then(res => {
                message.success('保存成功');
                this.loadData();
            }).catch(err => {
                this.props.setError(err);
            })
        } else {
            http.get(api.addUser, {
                username,
                userTickname
            }).then(res => {
                message.success('新增成功');
                window.history.go(-1);
            }).catch(err => {
                this.props.setError(err);
            })
        }
        
    }
    componentDidMount() {
        let location = this.props.history.location;
        let params = getParams(location.search);
        if (params.mode === 'edit') {
            this.loadData()
        }
        this.setState({
            mode: params.mode
        })
    }
    render() {
        let roleMap = new Map();
        if (this.props.roleList.length > 0) {
            this.props.roleList.forEach(item => {
                roleMap.set(item.value, item.label);
            })
        }
        let username = this.state.userDetailInfo.username;
        let userTickname = this.state.userDetailInfo.userTickname;
        return (
            <div className="user-detail-page">
               <Descriptions title="用户信息">
                    <Descriptions.Item label="用户名">
                        <Input value={username} defaultValue={username} onChange={this.changeUsername}></Input>
                    </Descriptions.Item>
                    {
                        this.state.mode === 'edit' && 
                        <Descriptions.Item label="用户id">{this.state.userDetailInfo.userId}</Descriptions.Item>
                    }
                    <Descriptions.Item label="用户昵称">
                        <Input value={userTickname} defaultValue={userTickname} onChange={this.changeUserTickname}></Input>
                    </Descriptions.Item>
                    {
                        this.state.mode === 'edit' && 
                        <Descriptions.Item label="用户角色">
                            {
                                this.state.userDetailInfo.roleId.map(tag => {
                                    let color = tag.length > 5 ? 'geekblue' : 'green';
                                    if (tag === '00') {
                                        color = 'volcano';
                                    }
                                    if (tag === '10') {
                                        color = 'gold';
                                    }
                                    if (tag === '20') {
                                        color = 'blue';
                                    }
                                    return (
                                        <Tag color={color} key={tag}>
                                        {roleMap.get(tag)}
                                        </Tag>
                                    );
                                })
                            }
                        </Descriptions.Item>
                    }
                </Descriptions>
               <div className="action-bar">
                    <Button type="primary" onClick={this.saveData}>保存</Button>
               </div>
            </div>
        )
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(UserDetail))