import React, {useState, useEffect} from 'react'
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
function UserDetail (props) {
    const [mode, setMode] = useState('edit');
    const [userDetailInfo, setUserDetailInfo] = useState({
        username: '',
        userId: '',
        userTickname: '',
        roleId: []
    });
    let roleMap = new Map();
    if (props.roleList.length > 0) {
        props.roleList.forEach(item => {
            roleMap.set(item.value, item.label);
        })
    }
    const username = userDetailInfo.username;
    const userTickname =userDetailInfo.userTickname;
    useEffect(() => {
        let location = props.history.location;
        let params = getParams(location.search);
        if (params.mode === 'edit') {
           loadData()
        }
        setMode(params.mode)
    }, []);
    function changeUsername (e) {
        setUserDetailInfo({
            ...userDetailInfo,
            username: e.target.value
        })
    }
    function changeUserTickname (e) {
        setUserDetailInfo({
            ...userDetailInfo,
            userTickname: e.target.value
        })
    }
    function loadData() {
        let location = props.history.location;
        let params = getParams(location.search);
        http.get(api.getUserDetailById, {
            userId: params.userId
        }).then(res => {
            console.log(res);
            const data = res.data;
            setUserDetailInfo({
                username: data.username,
                userId: data.userId,
                userTickname: data.userTickname,
                roleId: data.roleId
            })     
        }).catch(err => {
            props.setError(err);
        })
    }
    function saveData () {
        const {
            userId,
            username,
            userTickname
        } = userDetailInfo;
        if(!username) {
            message.warning('用户名不能为空!');
            return;
        }
        if(!userTickname) {
            message.warning('用户昵称不能为空!');
            return;
        }
        if (mode === 'edit') {
            http.get(api.setUserDetailById, {
                userId,
                username,
                userTickname
            }).then(res => {
                message.success('保存成功');
                loadData();
            }).catch(err => {
                props.setError(err);
            })
        } else {
            http.get(api.addUser, {
                username,
                userTickname
            }).then(res => {
                message.success('新增成功');
                window.history.go(-1);
            }).catch(err => {
                props.setError(err);
            })
        }
    }
    return (
        <div className="user-detail-page">
            <Descriptions title="用户信息">
                <Descriptions.Item label="用户名">
                    <Input value={username} defaultValue={username} onChange={changeUsername}></Input>
                </Descriptions.Item>
                {
                   mode === 'edit' && 
                    <Descriptions.Item label="用户id">{userDetailInfo.userId}</Descriptions.Item>
                }
                <Descriptions.Item label="用户昵称">
                    <Input value={userTickname} defaultValue={userTickname} onChange={changeUserTickname}></Input>
                </Descriptions.Item>
                {
                    mode === 'edit' && 
                    <Descriptions.Item label="用户角色">
                        {
                            userDetailInfo.roleId.map(tag => {
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
                <Button type="primary" onClick={saveData}>保存</Button>
            </div>
        </div>
    );
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(UserDetail))