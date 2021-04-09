import React, { FC, ReactElement, useEffect, useState } from "react"
import { AxiosResponse } from "axios"
import { RouteProps, useHistory, useParams } from "react-router-dom"
import { CloseOutlined } from "@ant-design/icons"
import { Col, Collapse, Row, Spin } from "antd"
import { TaskStatus } from "pages/TaskInfo/Common/Status"
import { AboutTask } from "pages/TaskInfo/AboutTask"
import { UploadMode } from "pages/TaskInfo/UploadFile"
import { Header } from "components/Header"
import { Icon } from "components/Icon"
import { ISubjectItemModel, ITaskItemModel } from "common/interfaces"
import { subjectRequest, taskRequest } from "common/api/TaskInfo"
import { IconTypes } from "common/enums"
import { blockPanel, dateByStatus } from "./helper"
import { useResponse } from "common/utils/reposnsive"
import "./styles.scss"

const { Panel } = Collapse

const TaskInfo: FC<RouteProps> = (): ReactElement => {
  const history = useHistory()
  const { subject_id } = useParams()
  const { mobile } = useResponse()

  const [tasks, setTasks] = useState<ITaskItemModel[]>()

  const [currentTaskId, setCurrentTaskId] = useState<string>("")

  const [isTaskOpen, setIsTaskOpen] = useState<boolean>(false)

  const [isTaskMode, setIsTaskMode] = useState<boolean>(false)

  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true)

  const [isLoadingComponent, setIsLoadingComponent] = useState<boolean>(false)

  const [subject, setSubject] = useState<ISubjectItemModel>()

  useEffect((): void => {
    subjectRequest(subject_id).then(
      (res: AxiosResponse<ISubjectItemModel>): void => {
        setSubject(res.data)
      }
    )

    taskRequest(subject_id).then(
      (res: AxiosResponse<ITaskItemModel[]>): void => {
        setTasks(res.data)
        setIsLoadingPage(false)
      }
    )
  }, [subject_id])

  const onCollapseChange = (id: string): void => {
    checkIsOpenTask(id)
    loaderComponent()
  }

  const checkIsOpenTask = (tid: string): void => {
    setIsTaskOpen(!isTaskOpen)

    if (currentTaskId && isTaskOpen) {
      setCurrentTaskId("")
    } else {
      setCurrentTaskId(tid)
    }

    if (!isTaskOpen) {
      setIsTaskMode(false)
    }
  }

  const changeTaskMode = (): void => {
    setIsTaskMode(!isTaskMode)
  }

  const loaderComponent = (): boolean => {
    if (isTaskOpen && !isLoadingPage) {
      return false
    }

    setIsLoadingComponent(true)
    setTimeout((): void => setIsLoadingComponent(false), 1000)
    return true
  }

  const SetNewTask = (newTask: ITaskItemModel[]): void => {
    setTasks(newTask)
  }

  return (
    <>
      <Header />

      <Col xs={24} className="task-info">
        <Row className="task-info__content">
          <Row className="content-subject-header">
            <Col xs={1}>
              <Row className="subject-header-info">
                <Icon icon={IconTypes.info} className="info-icon" />
              </Row>
            </Col>
            <Col md={20} xs={19} className="subject-header-title">
              <Row>
                <Col className="subject-name">{subject?.title}</Col>
              </Row>
            </Col>
            <Col xs={{ span: 1, offset: 1 }} className="subject-header-close">
              <CloseOutlined
                onClick={async () => {
                  await history.go(-1)
                }}
                className="close-icon"
              />
            </Col>
          </Row>
          <Col className="content-task-list">
            {tasks?.map(
              (task: ITaskItemModel): ReactElement => (
                <Row key={task.id} className="task-list-item">
                  <TaskStatus
                    status={task.status}
                    mark={task.mark}
                    open={isTaskOpen}
                    currentId={currentTaskId}
                    taskId={task.id}
                    taskLength={tasks?.length}
                  />
                  <Col
                    sm={{ span: 23, offset: 0 }}
                    xs={{ span: 22, offset: 1 }}
                    className="task-collapse"
                  >
                    <Collapse
                      onChange={(): void => onCollapseChange(task.id)}
                      key={task.id}
                      className="task-collapse-item"
                      expandIconPosition={"right"}
                    >
                      <Panel
                        extra={
                          !mobile &&
                          dateByStatus(task.status, task.dateEnd, task.deadline)
                        }
                        disabled={blockPanel(currentTaskId, task.id)}
                        className="item-panel"
                        key={task.id}
                        header={task.title}
                      >
                        <Spin spinning={isLoadingComponent}>
                          {isTaskMode ? (
                            <UploadMode
                              task={task}
                              changeTaskMode={changeTaskMode}
                              tasksSentFiles={task.tries}
                              subjectId={subject_id}
                              SetNewTask={SetNewTask}
                            />
                          ) : (
                            <AboutTask
                              task={task}
                              changeTaskMode={changeTaskMode}
                            />
                          )}
                        </Spin>
                      </Panel>
                    </Collapse>
                  </Col>
                </Row>
              )
            )}
          </Col>
        </Row>
      </Col>
    </>
  )
}

export { TaskInfo }
