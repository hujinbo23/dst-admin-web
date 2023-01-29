import { Space, Table, Upload, message, Divider, Button, Modal, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import { getBackupApi, deleteBackupApi, renameBackupApi } from '../../api/backupApi';


const buttonStyle = {
    margin: '0 8px',
    background: '#13CE66',
    color: '#fff',
    borderColor: '#13CE66'
}

const props = {
    name: 'file',
    action: 'http://localhost:8888/api/game/backup/upload',
    // showUploadList: false,
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    customRequest(info) {
        console.log(info.file, info.fileList);
    }
};





const Backup = () => {

    //选中的备份文件
    const [selectBackup, setSelectBackup] = useState({})
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [backupSize, setBackupSize] = useState(0)

    const [backupData, setBackupData] = useState([])

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [deleteBackup, setDeleteBackup] = useState({});

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [newBackupName, setNewBackupName] = useState("");


    const updateBackupData = () => {
        getBackupApi()
            .then(data => {
                const backupList = data.data || []
                for (let i = 0; i < backupList.length; i++) {
                    backupList[i].key = i
                }
                setBackupData(backupList)
                const totalSize = backupList
                    .map(backup => backup.fileSize)
                    .reduce((prev, curr) => !isNaN(Number(curr)) ? prev + curr : prev, 0) / 1024 / 1024 / 1024
                setBackupSize(totalSize.toFixed(4))
            })
    }

    useEffect(() => {
        updateBackupData()
    }, [])

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
            setSelectedRowKeys(selectedRowKeys)
            setSelectBackup(selectedRows)
        },
    }

    const deleteSelectBackup = () => {
        const length = selectBackup.length
        if (length < 1) {
            message.warning("请选择存档")
            return
        }
        const fileNames = selectBackup.map(item => item.fileName)
        deleteBackupApi(fileNames)
            .then(data => {
                console.log(data);
                message.success("删除成功")

                setSelectBackup([])
                setSelectedRowKeys([])
                updateBackupData()
            })
    }

    const deletBackupItem = (value) => {
        setConfirmLoading(true);
        const oldBackupData = backupData
        const newBackupData = oldBackupData.filter(item => value.key !== item.key)

        deleteBackupApi([value.fileName])
            .then(data => {
                if (data.code === 200) {
                    setTimeout(() => {
                        message.success("删除成功")
                        setConfirmLoading(false);
                        setIsDeleteModalOpen(false)

                        setBackupData(newBackupData)

                    }, 1000);

                }
            })
    }

    const renameBackupItem = (value) => {
        setConfirmLoading(true);
        const data = {
            fileName: value.fileName,
            newName: newBackupName+".zip"
        }

        const oldBackupData = backupData
        const newBackupData = oldBackupData.map(item => {
            if (item.key === value.key) {
                item.fileName = newBackupName+".zip"
            }
            return item
        })
       
        renameBackupApi(data)
        .then(data => {
            if (data.code === 200) {
                setTimeout(() => {
                    message.success("重命名成功")
                    setConfirmLoading(false);
                    setIsEditModalOpen(false)
                    setNewBackupName("")
                    setBackupData(newBackupData)

                }, 1000);

            }
        })
    }


    const columns = [
        {
            title: '存档名称',
            dataIndex: 'fileName',
            key: 'fileName',
            render: (text) => <Button type="link" >{text}</Button>,
            editable: true,
        },
        {
            title: '文件大小',
            dataIndex: 'fileSize',
            key: 'fileSize',
            render: (fileSize) => <span>{(fileSize/1024/1024).toFixed(2) + ' MB'}</span>,
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => { setIsEditModalOpen(true); setDeleteBackup(record) }}>修改</Button>
                    <Button type="link" onClick={() => { window.location.href = "/api/game/backup/download?fileName=" + record.fileName; }} >下载</Button>
                    <Button type="text" danger onClick={() => { setIsDeleteModalOpen(true); setDeleteBackup(record) }}>删除</Button>
                </Space>
            ),
        },
    ]


    return (
        <>
            <Space wrap>
                <Button type="primary" onClick={updateBackupData} >
                    刷新
                </Button>
                <Button type="primary" danger onClick={deleteSelectBackup} >
                    删除
                </Button>
                <Upload {...props}>
                    <Button style={buttonStyle} icon={<UploadOutlined />}>上传</Button>
                </Upload>
                <div>存档存储: {backupSize > 1? backupSize + "GB" : (backupSize*1024).toFixed(2)+" MB"}</div>
            </Space>
            <Divider />
            <Table
                columns={columns}
                dataSource={backupData}
                rowSelection={rowSelection}
                pagination={{
                    position: ['none'],
                    pageSize: 99999
                }}
                bordered
            />

            <Modal title="修改文件名"
                open={isEditModalOpen}
                confirmLoading={confirmLoading}
                getContainer={false}
                onOk={() => { renameBackupItem(deleteBackup) }}
                onCancel={() => { setIsEditModalOpen(false) }}>
                    <br />
                <Input allowClear placeholder="新的文件名" value={newBackupName} onChange={(e) => { setNewBackupName(e.target.value)}} />
            </Modal>

            <Modal title="提示" open={isDeleteModalOpen}
                confirmLoading={confirmLoading}
                getContainer={false}
                onOk={() => { deletBackupItem(deleteBackup) }}
                onCancel={() => { setIsDeleteModalOpen(false) }}>
                <p>确认删除：</p>
                <p>{deleteBackup.fileName || ""}</p>
            </Modal>
        </>
    )
};
export default Backup;