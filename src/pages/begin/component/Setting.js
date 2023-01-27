import { Form, Input, Tooltip, Button } from 'antd';

const Setting = (props) => {
    return (
        <>
            <h3>设置 steamcmd 安装路径</h3>

            <Form
                layout="vertical"
                labelAlign={'left'}
                form={props.form}
                style={{
                    margin: '24px',
                }}
            >
                <Form.Item
                    label="steamcmd安装路径"
                    name="steamcmd"
                    rules={[
                        {
                            required: true,
                            message: 'Please input steam cmd install path',
                        },
                    ]}
                >
                    <Input placeholder="steamcmd安装路径"/>
                </Form.Item>

                <Form.Item
                    label="饥荒服务器安装路径"
                    name="force_install_dir"
                    rules={[
                        {
                            required: true,
                            message: 'Please input dontstarve_dedicated_server_nullrenderer.exe path',
                        },
                    ]}
                >
                    <Input placeholder="steamcmd 饥荒联机版安装路径" />
                </Form.Item>
                <Form.Item
                    label="服务器存档位置"
                    name="doNotStarveTogether"
                    rules={[
                        {
                            required: true,
                            message: 'Please input dontstarve_dedicated_server name',
                        },
                    ]}
                >
                    <Input placeholder="服务器存档位置" />
                </Form.Item>

                <Form.Item
                    label="服务器房间文件名字"
                    name="cluster"
                    rules={[
                        {
                            required: true,
                            message: 'Please input dontstarve_dedicated_server name',
                        },
                    ]}
                >
                    <Input placeholder="服务器房间文件名字" />
                </Form.Item>

            </Form>
            <Tooltip placement="top" title={"导入 qinming99/dst-admin 安装位置"}>
                <Button type="link">
                    一键导入dst-admin
                </Button>
            </Tooltip>

        </>
    )
}
export default Setting