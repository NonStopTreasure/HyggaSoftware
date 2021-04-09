import React from "react"
import { format } from "date-fns"
import { Button, Row, Col } from "antd"
import { TaskFiles } from "pages/TaskInfo/Common/Files"
import { downloadAllFile } from "common/api/TaskInfo"
import { ITaskItemModel } from "common/interfaces"
import { useResponse } from "common/utils/reposnsive"
import { disableButton } from "../helper"
import { maxTriesText } from "./helpers"
import { UploadAll } from "./UploadAll"

import "./style.scss"

interface IMainInfoModel {
  task: ITaskItemModel
  changeTaskMode: () => void
}

const AboutTask = ({
  changeTaskMode,
  task,
}: IMainInfoModel): React.ReactElement => {
  const { mobile } = useResponse()

  const handleDownloadAllFiles = async (): Promise<void> => {
    const allFiles = await downloadAllFile(task.id)
    const downloadUrl = window.URL.createObjectURL(
      new Blob([allFiles.data], { type: "application/zip" })
    )
    const link = document.createElement("a")

    link.href = downloadUrl
    link.target = "_blank"
    link.setAttribute("download", task.title)
    document.body.appendChild(link)

    link.click()
    link.remove()
  }

  const {
    dateStart,
    dateEnd,
    topic,
    maxMark,
    status,
    maxTries,
    description,
    notes,
    files,
  } = task

  return (
    <Col xs={24} className="task-body">
      <Row className="task-body__header">
        <Col
          className="header__info-col"
          xl={21}
          lg={20}
          md={18}
          sm={16}
          xs={14}
        >
          <Row className="info">
            <Row>
              <Col className="info-term">
                <p className="info-term-name">Период:</p>
                <p className="info-term-data">
                  {format(new Date(dateStart), "d/MM/yyyy ")}-
                  {format(new Date(dateEnd), " d/MM/yyyy")}
                </p>
              </Col>
            </Row>
            <Row>
              <Col className="info-topic">
                <p className="info-topic-name">Тема:</p>
                <p className="info-topic-data">{topic}</p>
              </Col>
            </Row>
            <Row>
              <Col className="info-maxMark">
                <p className="info-maxMark-name">Максимальный бал:</p>
                <p className="info-maxMark-data">{maxMark}</p>
              </Col>
            </Row>
            <Row>
              <Col className="info-tries">
                <p className="info-tries-name">Количество попыток:</p>
                <Col className="info-tries-data">
                  <p>{maxTriesText(maxTries)}</p>
                </Col>
              </Col>
            </Row>
          </Row>
        </Col>

        <Col className="header__btn-col" xl={3} lg={4} md={6} sm={8} xs={10}>
          <Row className="btn">
            <Col className="btn-column">
              <Button
                className="btn-column-upload"
                onClick={changeTaskMode}
                disabled={disableButton(status)}
                block={disableButton(status)}
              >
                <p className="text">Отправить</p>
              </Button>
            </Col>
            <Col className="btn-column">
              <Button className="btn-column-question">
                <p className="text">Задать вопрос</p>
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      {description && (
        <Row className="task-body-border">
          <Col className="task-body-border__span" />
        </Row>
      )}

      <Row>
        <Col className="task-body__content">
          <Col className="content-description">
            {description && <p className="text">{description}</p>}
          </Col>
        </Col>
      </Row>

      {notes && (
        <Row className="task-body-border">
          <Col className="task-body-border__span" />
        </Row>
      )}

      <Col>
        <Row className="task-body__footer">
          <Col className="footer-notes">
            {notes && (
              <>
                <p className="name">Примечания:</p>
                <p className="text">{notes}</p>
              </>
            )}
          </Col>

          <Col span={24} className="footer-files">
            <Row className="files-download">
              <TaskFiles files={files} />
              {files && (
                <Row className="files-download-all">
                  <UploadAll onClick={handleDownloadAllFiles} mobile={mobile} />
                </Row>
              )}
            </Row>
          </Col>
        </Row>
      </Col>
    </Col>
  )
}

export { AboutTask }
