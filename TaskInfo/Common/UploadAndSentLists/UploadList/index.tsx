import { UploadFile } from "antd/lib/upload/interface"
import React from "react"
import { Column, Row } from "components/Layout"
import { AlignItemsTypes, JustifyContentTypes, MarginTypes } from "common/enums"
import { CloseOutlined, FileFilled } from "@ant-design/icons"
import { format } from "date-fns"
import { ITaskTriesModel } from "common/interfaces"

interface IUploadListProps {
  FileUploadList: UploadFile[]
  reSetFileList: (newArr: UploadFile[]) => void
  changeIsUploadListOpen: (state: boolean) => void
  FileSentList: ITaskTriesModel[]
  dottedFileName: (fileName: string) => string
}

const UploadList = (props: IUploadListProps): React.ReactElement => {
  const {
    changeIsUploadListOpen,
    FileSentList,
    FileUploadList,
    reSetFileList,
    dottedFileName,
  } = props

  const delFile = (file: UploadFile, fileArr: UploadFile[]): UploadFile[] =>
    fileArr.filter((item: UploadFile): boolean => file.uid !== item.uid)

  if (FileUploadList !== null) {
    return (
      <Row classes="file-list-upload">
        {FileUploadList.length !== 0 ? (
          <Column
            ai={AlignItemsTypes.center}
            jc={JustifyContentTypes.center}
            classes="upload-box"
          >
            <Row
              classes="upload-box__header"
              jc={JustifyContentTypes.spaceAround}
              ai={AlignItemsTypes.center}
            >
              <Column widthAuto>
                <p className="header__text">Загруженные файлы</p>
              </Column>
              <Column margin={MarginTypes.left}>
                <span className="header__span" />
              </Column>
            </Row>
            <Column classes="upload-box__content">
              {FileUploadList.map(
                (FileUpload: UploadFile): React.ReactElement => (
                  <Row
                    key={FileUpload.uid}
                    ai={AlignItemsTypes.center}
                    jc={JustifyContentTypes.spaceBetween}
                    classes="upload-file"
                  >
                    <Row ai={AlignItemsTypes.center}>
                      <Column
                        classes="upload-file__icon"
                        widthAuto
                        ai={AlignItemsTypes.center}
                        jc={JustifyContentTypes.spaceBetween}
                      >
                        <FileFilled className="img" />
                      </Column>

                      <Column widthAuto classes="upload-file-info">
                        <Row
                          jc={JustifyContentTypes.center}
                          ai={AlignItemsTypes.center}
                          classes="info-name"
                        >
                          <p>
                            {FileUpload.name !== undefined
                              ? dottedFileName(FileUpload.name)
                              : null}
                          </p>
                        </Row>
                        <Row classes="info-date-and-size">
                          <p className="size__text">
                            {FileUpload.size / 1024 > 1024
                              ? (FileUpload.size / 1024 / 1024).toFixed(1) +
                                "MB"
                              : FileUpload.size / 1024 > 1
                              ? (FileUpload.size / 1024).toFixed(1) + "KB"
                              : FileUpload.size + "B"}
                          </p>
                          <p className="date__text">
                            {format(new Date(), "HH:mm")}
                          </p>
                        </Row>
                      </Column>
                    </Row>

                    <Column
                      jc={JustifyContentTypes.center}
                      ai={AlignItemsTypes.center}
                      margin={MarginTypes.right_x2}
                      widthAuto
                      classes="upload-file-del"
                      onClick={(): void => {
                        reSetFileList(delFile(FileUpload, FileUploadList))
                        if (
                          delFile(FileUpload, FileUploadList).length === 0 &&
                          FileSentList === null
                        ) {
                          changeIsUploadListOpen(false)
                        }
                      }}
                    >
                      <CloseOutlined />
                    </Column>
                  </Row>
                )
              )}
            </Column>
          </Column>
        ) : null}
      </Row>
    )
  }

  return (
    <Column>
      <p>Nothing</p>
    </Column>
  )
}

export { UploadList }
