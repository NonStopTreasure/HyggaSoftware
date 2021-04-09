import React, { ReactElement } from "react"
import { format } from "date-fns"
import { Col, Row } from "antd"
import { FileFilled } from "@ant-design/icons"
import { ITaskFileModel } from "common/interfaces"
import { downloadFile } from "common/api/TaskInfo"
import { getDottedFileName } from "common/utils/getDottedText"
import { getFileSizeText } from "./helpers"

interface ITaskFilesProps {
  files: ITaskFileModel[]
}

const TaskFiles = ({ files }: ITaskFilesProps): React.ReactElement => {
  if (!files) {
    return <Col className="no-task-files" />
  }

  const handleDownloadFile = async (
    filePath: string,
    name: string
  ): Promise<void> => {
    const file = await downloadFile(filePath)
    const downloadUrl = window.URL.createObjectURL(new Blob([file.data]))
    const link = document.createElement("a")
    link.href = downloadUrl
    link.target = "_blank"
    link.setAttribute("download", name)
    document.body.appendChild(link)

    link.click()
    link.remove()
  }

  return (
    <Row className="files-download-one">
      {files.map(
        ({ id, path, name, size, date }: ITaskFileModel): ReactElement => (
          <Col
            key={id}
            md={5}
            sm={11}
            xs={23}
            className="file-content"
            onClick={(): Promise<void> => handleDownloadFile(path, name)}
          >
            <Row className="file-content-icon">
              <FileFilled className="img" />
            </Row>

            <Row className="file-content-info">
              <Col className="info-name">
                <p>{getDottedFileName(name, 20)}</p>
              </Col>
              <Col className="info-date-and-size">
                <p className="size__text">{getFileSizeText(size)} -</p>
                <p className="date__text">{format(new Date(date), "HH:mm")}</p>
              </Col>
            </Row>
          </Col>
        )
      )}
    </Row>
  )
}

export { TaskFiles }
