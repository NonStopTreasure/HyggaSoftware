import React, { useState } from "react"
import { Upload, Button, Row, Col } from "antd"
import { AxiosResponse } from "axios"
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface"
import { InboxOutlined } from "@ant-design/icons"
import { ITaskItemModel, ITaskTriesModel } from "common/interfaces"
import { taskRequest } from "common/api/TaskInfo"
import { taskTries } from "pages/TaskInfo/Common/Tries"
import { UploadAndSentLists } from "pages/TaskInfo/Common/UploadAndSentLists"
import { useResponse } from "common/utils/reposnsive"
import { DraggerOnChange, DraggerProps, handleUpload } from "./helpers"
import NoInfoSvg from "./emojione-monotone_nerd-face.svg"

import "./style.scss"

interface IUploadModeModel {
  task: ITaskItemModel
  tasksSentFiles: ITaskTriesModel[]
  changeTaskMode: () => void
  subjectId: string
  SetNewTask: (newTask: ITaskItemModel[]) => void
}

const { Dragger } = Upload

const UploadMode = ({
  tasksSentFiles,
  changeTaskMode,
  task,
  subjectId,
  SetNewTask,
}: IUploadModeModel): React.ReactElement => {
  const { mobile } = useResponse()

  const checkTaskSentFilesList = (): boolean =>
    tasksSentFiles !== null && tasksSentFiles.length !== 0

  const [FileList, setFileList] = useState<UploadFile[]>([])

  const [isUploadListOpen, setIsUploadListOpen] = useState<boolean>(
    checkTaskSentFilesList()
  )

  const reSetFileList = (newArr: UploadFile[]): void => {
    setFileList(newArr)
  }

  const changeIsUploadListOpen = (state: boolean): void => {
    setIsUploadListOpen(state)
  }
  const sendRequest = async (): Promise<void> => {
    await handleUpload(task.id, FileList)
    setFileList([])
    const newTask: AxiosResponse = await taskRequest(subjectId)
    SetNewTask(newTask.data)
  }
  return (
    <Col xs={24} className="task-info-upload-file">
      <Row className="content">
        <Col className="content__dragger" span={isUploadListOpen ? 14 : 24}>
          {mobile ? (
            <Upload
              {...DraggerProps}
              className="dragger__mobile-btn"
              onChange={(info: UploadChangeParam): void => {
                DraggerOnChange(
                  FileList,
                  info,
                  changeIsUploadListOpen,
                  tasksSentFiles,
                  setFileList
                )
              }}
              showUploadList={false}
              fileList={FileList}
            >
              <p className="mobile-btn__text">Нажмите чтобы заргузить файлы</p>
            </Upload>
          ) : (
            <Dragger
              disabled={
                task.tries ? task.maxTries - task.tries.length === 0 : false
              }
              {...DraggerProps}
              onChange={(info: UploadChangeParam): void => {
                DraggerOnChange(
                  FileList,
                  info,
                  changeIsUploadListOpen,
                  tasksSentFiles,
                  setFileList
                )
              }}
              fileList={FileList}
              height={320}
              showUploadList={false}
              className="dragger-upload-field"
            >
              <InboxOutlined className="upload-field__icon" />

              <p className="upload-field__text_s1">
                Перетащите файл в это окно
              </p>
              <p className="upload-field__text_s2">или</p>
              <Row>
                <Col xs={14} className="upload-field__choose-btn">
                  <p className="choose__text upload-field__text_s2">
                    Выберите файл на компьютере
                  </p>
                </Col>
              </Row>
              <p className="upload-field__text_s2">
                Вес всех загруженных файлов не должен превышать 50MB
              </p>
              <p className="upload-field__text_s3">Доступные такие форматы:</p>
              <p className="upload-field__text_s3">
                .exe,.zip,.doc,.docx,.ppt,.pptx,.xlsx,.pdf
              </p>
            </Dragger>
          )}
        </Col>
        <Col className="content__file-list" span={isUploadListOpen ? 10 : 0}>
          {!isUploadListOpen && mobile && (
            <Row className="file-list_no-info">
              <Col className="img_no-info">
                <img src={NoInfoSvg} alt={"No DrawerInfo"} />
              </Col>
              <Col className="text_no-info">
                <p>Здесь еще нет файлов. Загрузите и отправьте на проверку.</p>
              </Col>
            </Row>
          )}

          {isUploadListOpen && (
            <UploadAndSentLists
              FileUploadList={FileList}
              FileSentList={tasksSentFiles}
              TaskItem={task}
              reSetFileList={reSetFileList}
              changeIsUploadListOpen={changeIsUploadListOpen}
              subjectId={subjectId}
              SetNewTask={SetNewTask}
            />
          )}
        </Col>
      </Row>

      <Row className="footer">
        <Col className="footer-return" onClick={changeTaskMode}>
          <Button className="return__btn">
            <p>Назад</p>
          </Button>
        </Col>
        <Row className="footer-send">
          <Row className="send-try-info">
            <p className="try-info__text">У вас осталось попыток: </p>
            <p className="try-info__text">
              {taskTries(task.tries, task.maxTries)}
            </p>
          </Row>

          <Col className="send__btn-col">
            <Button
              disabled={
                (FileList ? FileList.length === 0 : true) ||
                (task.tries ? task.maxTries - task.tries.length <= 0 : false)
              }
              block={
                (FileList ? FileList.length === 0 : true) ||
                (task.tries ? task.maxTries - task.tries.length <= 0 : false)
              }
              className="file-send-btn"
              onClick={sendRequest}
            >
              <p>Отправить</p>
            </Button>
          </Col>
        </Row>
      </Row>
    </Col>
  )
}

export { UploadMode }
