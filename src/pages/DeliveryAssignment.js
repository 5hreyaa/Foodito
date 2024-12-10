import React, { useState, useEffect } from 'react';
import { UserCircle, Phone, Star, Truck, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './DeliveryAssignment.css';

const deliveryPersonnel = [
  { phone: "+91 98765 43210", name: "Rajesh Kumar", rating: 4.8, deliveries: 156, availableFrom: '09:00', availableTo: '17:00' },
  { phone: "+91 87654 32109", name: "ShaanthaKumar", rating: 4.9, deliveries: 203, availableFrom: '10:00', availableTo: '18:00' },
  { phone: "+91 76543 21098", name: "Rathesh Kumar", rating: 4.7, deliveries: 178, availableFrom: '12:00', availableTo: '20:00' },
  { phone: "+91 65432 10987", name: "Siddarth", rating: 4.9, deliveries: 245, availableFrom: '08:00', availableTo: '16:00' },
  { phone: "+91 54321 09876", name: "Vishal", rating: 4.6, deliveries: 134, availableFrom: '11:00', availableTo: '19:00' }
];

const DeliveryAssignment = () => {
  const navigate = useNavigate();
  const [assigned, setAssigned] = useState(false);
  const [selectedDeliveryPerson, setSelectedDeliveryPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderCancelled, setOrderCancelled] = useState(false);
  const [deliveryTimes, setDeliveryTimes] = useState({
    orderConfirmed: null,
    partnerAssigned: null,
    pickingUp: null,
    onTheWay: null,
    delivered: null
  });

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getEstimatedTime = (minutesFromNow) => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + minutesFromNow);
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const assignDeliveryPerson = () => {
    setLoading(true);
    const currentHour = new Date().getHours();
    
    const availablePersonnel = deliveryPersonnel.filter(person => {
      const fromHour = parseInt(person.availableFrom.split(':')[0]);
      const toHour = parseInt(person.availableTo.split(':')[0]);
      return currentHour >= fromHour && currentHour < toHour;
    });

    setTimeout(() => {
      if (availablePersonnel.length > 0) {
        const randomIndex = Math.floor(Math.random() * availablePersonnel.length);
        const deliveryPerson = availablePersonnel[randomIndex];
        setSelectedDeliveryPerson(deliveryPerson);
        setAssigned(true);
        
        const now = getCurrentTime();
        setDeliveryTimes({
          orderConfirmed: now,
          partnerAssigned: getEstimatedTime(5),
          pickingUp: getEstimatedTime(15),
          onTheWay: getEstimatedTime(30),
          delivered: getEstimatedTime(60)
        });
      } else {
        setAssigned(false);
      }
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    assignDeliveryPerson();
  }, []);

  const handleCancelOrder = () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      setOrderCancelled(true);
    }
  };

  if (orderCancelled) {
    return (
      <div className="delivery-container">
        <div className="delivery-card">
          <div className="cancelled-status">
            <XCircle className="cancel-icon" />
            <h2>Order Cancelled</h2>
            <p>Your order has been cancelled successfully</p>
          </div>
          <div className="button-group">
            <button 
              className="primary-button" 
              onClick={() => navigate('/')}
            >
              Place New Order
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="delivery-container">
      <div className="delivery-card">
        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
            <p>Finding the best delivery partner for you...</p>
          </div>
        ) : !assigned ? (
          <div className="no-partner">
            <p className="error-message">No delivery partners currently available</p>
            <div className="button-group">
              <button className="primary-button" onClick={assignDeliveryPerson}>
                Try Again
              </button>
              <button className="secondary-button" onClick={() => navigate('/')}>
                Back to Home
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="order-status">
              <div className="status-indicator">
                <div className="status-dot" />
                <span>Order In Progress</span>
              </div>
              <button className="cancel-order" onClick={handleCancelOrder}>
                Cancel Order
              </button>
            </div>

            <div className="partner-details">
              <div className="partner-avatar">
                <UserCircle size={48} />
              </div>
              <h2>{selectedDeliveryPerson.name}</h2>
              <div className="phone-number">
                <Phone size={16} />
                <span>{selectedDeliveryPerson.phone}</span>
              </div>
              <div className="partner-stats">
                <div className="stat">
                  <Star size={16} />
                  <span>{selectedDeliveryPerson.rating}</span>
                </div>
                <div className="stat">
                  <Truck size={16} />
                  <span>{selectedDeliveryPerson.deliveries} deliveries</span>
                </div>
              </div>
            </div>

            <div className="order-timeline">
              <h3>Order Timeline</h3>
              <div className="timeline-steps">
                <div className="timeline-step completed">
                  <div className="step-icon">
                    <CheckCircle size={20} />
                  </div>
                  <div className="step-content">
                    <p>Order Confirmed</p>
                    <span>{deliveryTimes.orderConfirmed}</span>
                  </div>
                </div>
                <div className="timeline-step completed">
                  <div className="step-icon">
                    <CheckCircle size={20} />
                  </div>
                  <div className="step-content">
                    <p>Partner Assigned</p>
                    <span>{deliveryTimes.partnerAssigned}</span>
                  </div>
                </div>
                <div className="timeline-step active">
                  <div className="step-icon">
                    <CheckCircle size={20} />
                  </div>
                  <div className="step-content">
                    <p>Picking Up Order</p>
                    <span>Expected by {deliveryTimes.pickingUp}</span>
                  </div>
                </div>
                <div className="timeline-step">
                  <div className="step-icon">
                    <CheckCircle size={20} />
                  </div>
                  <div className="step-content">
                    <p>On The Way</p>
                    <span>Expected by {deliveryTimes.onTheWay}</span>
                  </div>
                </div>
                <div className="timeline-step">
                  <div className="step-icon">
                    <CheckCircle size={20} />
                  </div>
                  <div className="step-content">
                    <p>Delivered</p>
                    <span>Expected by {deliveryTimes.delivered}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DeliveryAssignment;