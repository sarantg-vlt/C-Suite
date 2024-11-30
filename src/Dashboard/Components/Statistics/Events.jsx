import './Events.css'
import { Calendar } from "lucide-react"

const Events = () => {
  return (
      <>
          <div className="Events">
              <div className="event-container">
                  <ul>
                      <li className='event-card'>
                          <Calendar />
                          <div className="event-content">
                              <h6 className="event-title">event-1</h6>
                              <p className="event-description">Lorem ipsum dolor sit amet.</p>
                              <p className="event-date">12/12/2024</p>
                          </div>
                      </li>
                  </ul>
              </div>
          </div>
      </>
  )
}

export default Events