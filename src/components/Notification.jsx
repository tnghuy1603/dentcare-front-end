import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Notification = ({notification}) => {
  return (
    <>
    <div className="modal fade" id="notification" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{notification.title}</h5>
                        <button type="button" className="btn btn-secondary close-notification" data-dismiss="modal" aria-label="Close">
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                    <div className={`modal-body text-${notification.status}`}>
                        {notification.body}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary close-notification">{notification.footer}</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default PromtModal