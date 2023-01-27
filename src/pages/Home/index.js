import React, { useState, useEffect } from 'react';
import { Button, message, Steps, Form, Card,Skeleton  } from 'antd';

import HomeSetting from './component/HomeSetting';
import SettingDone from './component/SettingDone';
import HomeMaster from './component/HomeMaster';
import HomeCaves from './component/HomeCaves';
import HomeMod from './component/HomeMod';

import { getHomeConfigApi } from '../../api/gameApi';

const Home = () => {

    const [form] = Form.useForm();
    const [current, setCurrent] = useState(0);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHomeConfig = () => {
            return getHomeConfigApi()
                .then(data => {
                    console.log(data.data)
                    if(data.data === null || data === undefined) {
                        message.error('获取房间配置失败')
                    }
                    form.setFieldsValue(data.data)
                    setLoading(false)
                })
        }
        fetchHomeConfig()
    }, [form])

    const steps = [
        {
            title: '房间设置',
            content: (<HomeSetting form={form} />),
        },
        {
            title: '地面世界设置',
            content: (<HomeMaster form={form} />),
        },
        {
            title: '洞穴世界设置',
            content: (<HomeCaves form={form} />),
        },
        {
            title: 'MOD 设置',
            content: (<HomeMod form={form} />),
        },
        {
            title: '完成',
            content: (<SettingDone form={form} />),
        },
    ];


    const next = () => {
        if(loading){
            return
        }
        console.log(form.getFieldValue())
        form.validateFields().then(value => {
            // 验证通过后进入
            // const { name, age } = value;
            // console.log(name, age); // dee 18
            setCurrent(current + 1);
        }).catch(err => {
            // 验证不通过时进入
            message.error(err.errorFields[0].errors[0])
        });

        //setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));



    return (
        <>
            <Card>
                <Steps current={current} items={items} size="small" />
                <br /><br />
                <Skeleton loading={loading} active avatar>
                    <div className="steps-content">{steps[current].content}</div>
                </Skeleton>
                
                <br />
                <div className="steps-action">
                    {current > 0 && (
                        <Button
                            style={{
                                margin: '0 8px',
                                background: '#13CE66',
                                color: '#fff'
                            }}
                            onClick={() => prev()}
                        >
                            上一步
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => {
                            message.success('房间设置完成!')
                            setCurrent(0)
                        }}>
                            保存设置
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button
                        style={{
                            margin: '0 8px',
                            background: '#F56C6C',
                            color: '#fff'
                        }}
                        onClick={() => {
                            message.success('正在生成新的游戏!')
                            setCurrent(0)
                        }}>
                            新的游戏
                        </Button>
                    )}
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            下一步
                        </Button>
                    )}


                </div>
            </Card>
        </>
    );
};
export default Home;