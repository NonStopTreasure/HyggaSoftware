import { UploadFile, UploadChangeParam } from "antd/lib/upload/interface"
import { uploadFile } from "common/api/TaskInfo"
import { Modal } from "antd"
import { ITaskTriesModel } from "common/interfaces"
import React from "react"

const DraggerProps = {
  accept:
    "application/x-msdownload," +
    "application/x-zip-compressed," +
    "application/vnd.openxmlformats-officedocument.presentationml.presentation," +
    "application/msword," +
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document," +
    ".exe," +
    "application/pdf," +
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  multiple: true,
  beforeUpload: (): boolean => false,
}

const handleUpload = async (
  fileId: string,
  FileList: UploadFile[]
): Promise<void> => {
  const formData = new FormData()
  FileList.forEach(
    (file: UploadFile): void =>
      file.originFileObj &&
      formData.append("file", file.originFileObj, file.fileName)
  )
  await uploadFile(fileId, formData)
}

const DraggerOnChange = (
  FileList: UploadFile[],
  info: UploadChangeParam,
  changeIsUploadListOpen: (state: boolean) => void,
  tasksSentFiles: ITaskTriesModel[],
  setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>
): void => {
  const acceptedTypes = DraggerProps.accept.split(",")
  if (acceptedTypes.find((item: string): boolean => info.file.type === item)) {
    const fileSize = info.file.size / 1024 / 1024

    const fileListSize = FileList.reduce(
      (previousValue: number, currentValue: UploadFile): number =>
        previousValue + currentValue.size,
      0
    )

    if (
      fileSize >= 50 ||
      fileListSize / 1024 / 1024 >= 50 ||
      fileSize + fileListSize / 1024 / 1024 >= 50
    ) {
      Modal.info({
        title: "Ошибка",
        content: "Cумма загруженных файлов превысит 50 MB",
      })
    } else {
      if (FileList.length !== 5) {
        setFileList([...FileList, info.fileList[info.fileList.length - 1]])

        changeIsUploadListOpen(true)
      } else {
        Modal.info({
          title: "Ошибка",
          content: "Вы превесили допустимое количество файлов",
        })
      }
    }
  } else {
    Modal.info({
      title: "Ошибка",
      content: "Расширение отсылаемого файла недопустимо",
    })
    if (info.fileList.length === 0 && tasksSentFiles.length === null) {
      changeIsUploadListOpen(false)
    }
  }
}

export { DraggerProps, handleUpload, DraggerOnChange }
