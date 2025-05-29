'use client';

import { User } from '@/types';
import { format } from 'date-fns';
import Image from 'next/image';
import { useState } from 'react';
import { 
  Modal, 
  Box, 
  Typography, 
  Button, 
  TextField,
  Chip,
  Divider,
  IconButton,
  Tab,
  Tabs
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface UserCardProps {
  user: User;
  onStatusChange?: (userId: string, status: 'approved' | 'rejected', reason?: string) => void;
}

export default function UserCard({ user, onStatusChange }: UserCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showConfirmation, setShowConfirmation] = useState<'approve' | 'reject' | null>(null);
  const [tabValue, setTabValue] = useState(0);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const handleApprove = () => {
    if (onStatusChange) {
      onStatusChange(user.id, 'approved');
      setShowConfirmation(null);
      setIsModalOpen(false);
    }
  };

  const handleReject = () => {
    if (onStatusChange) {
      onStatusChange(user.id, 'rejected', rejectionReason);
      setRejectionReason('');
      setShowConfirmation(null);
      setIsModalOpen(false);
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
      xs: '90%',
      sm: '80%',
      md: '70%',
      lg: '60%',
    },
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
    overflow: 'auto',
  };

  return (
    <>      <Box 
        className="bg-white border rounded-lg shadow-sm overflow-hidden h-full"
        sx={{
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          }
        }}
      >
        {/* Card Header - this is all that shows in the list view */}
        <div 
          className="p-5 cursor-pointer"
          onClick={handleOpenModal}
        >
          <div className="flex justify-between items-start mb-3">
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(user.status)}`}
            >
              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </span>
            <button
              type="button"
              aria-label="View details"
              className="text-gray-400 hover:text-gray-600"
            >
              <svg 
                className="w-5 h-5"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
          <h3 className="font-medium text-gray-900 text-lg mb-1">{user.name}</h3>
          <p className="text-sm text-gray-500 mb-2">{user.email}</p>
          <div className="flex items-center text-xs text-gray-500 space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>
            <span>{user.school.name}</span>
          </div>
        </div>
      </Box>

      {/* Modal for detailed view */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          {/* Modal Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography id="modal-title" variant="h6" component="h2">
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Application ID: {user.id}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip 
                label={user.status.charAt(0).toUpperCase() + user.status.slice(1)} 
                color={
                  user.status === 'approved' ? 'success' : 
                  user.status === 'rejected' ? 'error' : 'warning'
                }
                size="small"
              />
              <IconButton onClick={handleCloseModal} aria-label="close">
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          {/* Tabs for better organization */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="user information tabs">
              <Tab label="Personal Info" />
              <Tab label="School Info" />
              <Tab label="Essay" />
              <Tab label="Payment" />
            </Tabs>
          </Box>
          
          {/* Personal Info Tab */}
          <Box role="tabpanel" hidden={tabValue !== 0} sx={{ mt: 2 }}>
            {tabValue === 0 && (
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Contact Information</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Email</Typography>
                    <Typography variant="body1">{user.email}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Phone Number</Typography>
                    <Typography variant="body1">{user.phoneNumber}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">National Registration Number</Typography>
                    <Typography variant="body1">{user.nationalRegistrationNumber}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Applied on</Typography>
                    <Typography variant="body1">{format(new Date(user.createdAt), 'MMM d, yyyy')}</Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
          
          {/* School Info Tab */}
          <Box role="tabpanel" hidden={tabValue !== 1} sx={{ mt: 2 }}>
            {tabValue === 1 && (
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>School Information</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">School Name</Typography>
                    <Typography variant="body1">{user.school.name}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Average Grade</Typography>
                    <Typography variant="body1">{user.school.averageGrade}/100</Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
          
          {/* Essay Tab */}
          <Box role="tabpanel" hidden={tabValue !== 2} sx={{ mt: 2 }}>
            {tabValue === 2 && (
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Essay</Typography>
                <Box sx={{ 
                  backgroundColor: '#f9fafb',
                  p: 2,
                  borderRadius: 1,
                  maxHeight: '300px',
                  overflow: 'auto'
                }}>
                  <Typography variant="body2">
                    {user.essay}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
          
          {/* Payment Tab */}
          <Box role="tabpanel" hidden={tabValue !== 3} sx={{ mt: 2 }}>
            {tabValue === 3 && (
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Payment Confirmation</Typography>
                <Box sx={{ 
                  backgroundColor: '#f9fafb',
                  p: 2,
                  borderRadius: 1,
                  mb: 1
                }}>
                  <Box sx={{ position: 'relative', height: '300px', width: '100%' }}>
                    <Image
                      src={user.paymentConfirmation.imageUrl}
                      alt="Payment receipt"
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </Box>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Uploaded on: {format(new Date(user.paymentConfirmation.uploadedAt), 'MMM d, yyyy')}
                </Typography>
              </Box>
            )}
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          {/* Action Buttons for Status Change */}
          {user.status === 'pending' && onStatusChange && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
              {showConfirmation === 'approve' ? (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button 
                    variant="contained" 
                    color="success" 
                    onClick={handleApprove}
                    size="small"
                  >
                    Confirm Approval
                  </Button>
                  <Button 
                    variant="outlined"
                    onClick={() => setShowConfirmation(null)}
                    size="small"
                  >
                    Cancel
                  </Button>
                </Box>
              ) : (
                <Button 
                  variant="contained" 
                  color="success"
                  onClick={() => setShowConfirmation('approve')}
                  size="small"
                >
                  Approve
                </Button>
              )}
              
              {showConfirmation === 'reject' ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '300px' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 1, mt: 1 }}>
                    <Button 
                      variant="outlined"
                      onClick={() => setShowConfirmation(null)}
                      size="small"
                    >
                      Cancel
                    </Button>                    
                    <Button 
                      variant="contained" 
                      color="error"
                      onClick={handleReject}
                      size="small"
                    >
                      Confirm Rejection
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Button 
                  variant="contained" 
                  color="error"
                  onClick={() => setShowConfirmation('reject')}
                  size="small"
                >
                  Reject
                </Button>
              )}
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
}
