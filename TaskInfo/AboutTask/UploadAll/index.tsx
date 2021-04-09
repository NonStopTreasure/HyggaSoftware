import React, { ReactElement } from "react"
import { DownloadOutlined } from "@ant-design/icons"
import { Button, Col } from "antd"

interface IUploadAllProps {
  onClick: () => Promise<void>
  mobile: boolean
}

const UploadAll = ({ onClick, mobile }: IUploadAllProps): ReactElement => {
  if (mobile) {
    return (
      <Col xs={24} className="files-download-all_mobile">
        <Button className="files-download-all_mobile__btn" onClick={onClick}>
          Загрузить все файлы
        </Button>
      </Col>
    )
  }

  return (
    <Col xs={1}>
      <DownloadOutlined
        className="files-download-all__icon"
        onClick={onClick}
      />
    </Col>
  )
}

export { UploadAll }
