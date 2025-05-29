'use client';

import React, { useState, useMemo } from 'react';
import { 
  DataGrid, 
  GridColDef, 
  GridRowParams,
  GridToolbar
} from '@mui/x-data-grid';
import { 
  Modal, 
  Box, 
  Typography, 
  Button, 
  Chip,
  Divider,
  IconButton,
  Tab,
  Tabs,
  Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { format } from 'date-fns';
import Image from 'next/image';

import { User } from '@/types';
import { generateMockUsers } from '@/data/mockDataGenerator';

// Extend the User interface to work with DataGrid
interface UserRow {
  id: string;
  registrationNumber: number;
  name: string;
  email: string;
  phoneNumber: string;
  nationalRegistrationNumber: string;
  schoolName: string;
  schoolAverageGrade: number;
  essay: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

// Convert User to UserRow
const convertUserToRow = (user: User): UserRow => ({
  id: user.id,
  registrationNumber: user.registrationNumber,
  name: user.name,
  email: user.email,
  phoneNumber: user.phoneNumber,
  nationalRegistrationNumber: user.nationalRegistrationNumber,
  schoolName: user.school.name,
  schoolAverageGrade: user.school.averageGrade,
  essay: user.essay,
  status: user.status,
  createdAt: format(new Date(user.createdAt), 'MMM d, yyyy'),
  updatedAt: format(new Date(user.updatedAt), 'MMM d, yyyy'),
});

// Generate mock data
let usersStore: User[] = generateMockUsers(500);

interface UserCrudListProps {
  onStatusChange?: (userId: string, status: 'approved' | 'rejected', reason?: string) => void;
}

interface UserModalProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
  onStatusChange?: (userId: string, status: 'approved' | 'rejected', reason?: string) => void;
}

// User Detail Modal Component (extracted from UserCard)
function UserModal({ user, open, onClose, onStatusChange }: UserModalProps) {
  const [showConfirmation, setShowConfirmation] = useState<'approve' | 'reject' | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [tabValue, setTabValue] = useState(0);

  if (!user) return null;

  const handleApprove = () => {
    if (onStatusChange) {
      onStatusChange(user.id, 'approved');
      setShowConfirmation(null);
      onClose();
    }
  };

  const handleReject = () => {
    if (onStatusChange) {
      onStatusChange(user.id, 'rejected', rejectionReason);
      setRejectionReason('');
      setShowConfirmation(null);
      onClose();
    }
  };

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
    <Modal
      open={open}
      onClose={onClose}
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
            <Typography variant="body2" color="text.secondary">
              Registration #: {user.registrationNumber}
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
            <IconButton onClick={onClose} aria-label="close">
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
                  <Typography variant="body2" color="text.secondary">Registration Number</Typography>
                  <Typography variant="body1">#{user.registrationNumber}</Typography>
                </Box>
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
            ) : showConfirmation === 'reject' ? (
              <Box sx={{ display: 'flex', gap: 1 }}>
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
            ) : (
              <>
                <Button 
                  variant="contained" 
                  color="success"
                  onClick={() => setShowConfirmation('approve')}
                  size="small"
                >
                  Approve
                </Button>
                <Button 
                  variant="contained" 
                  color="error"
                  onClick={() => setShowConfirmation('reject')}
                  size="small"
                >
                  Reject
                </Button>
              </>
            )}
          </Box>
        )}
      </Box>
    </Modal>
  );
}

export default function UserCrudList({ onStatusChange }: UserCrudListProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStatusUpdate = (
    userId: string, 
    status: 'approved' | 'rejected', 
    reason?: string
  ) => {
    // Update the mock data
    usersStore = usersStore.map(user => {
      if (user.id === userId) {
        return { ...user, status, updatedAt: new Date() };
      }
      return user;
    });    // Call parent callback if provided
    if (onStatusChange) {
      onStatusChange(userId, status, reason);
    }

    // Note: DataSourceCache doesn't have invalidate method in current version
    // The data will be refreshed on next query
  };

  const handleViewUser = (userId: string) => {
    const user = usersStore.find(u => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };
  // Data source configuration
  const usersDataSource: DataSource<UserDataModel> = {
    fields: [
      { field: 'registrationNumber', headerName: 'Reg #', width: 80 },
      { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
      { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
      { field: 'schoolName', headerName: 'School', flex: 1, minWidth: 200 },
      { field: 'schoolAverageGrade', headerName: 'Grade', width: 80 },
      { field: 'status', headerName: 'Status', width: 120 },
      { field: 'createdAt', headerName: 'Applied', width: 120 },
    ],

    getMany: async ({ paginationModel, filterModel, sortModel }) => {
      // Simulate loading delay
      await new Promise((resolve) => {
        setTimeout(resolve, 300);
      });

      let processedUsers = [...usersStore];

      // Apply filters
      if (filterModel?.items?.length) {
        filterModel.items.forEach(({ field, value, operator }) => {
          if (!field || value == null) {
            return;
          }

          processedUsers = processedUsers.filter((user) => {
            let userValue: any;
            
            switch (field) {
              case 'schoolName':
                userValue = user.school.name;
                break;
              case 'schoolAverageGrade':
                userValue = user.school.averageGrade;
                break;
              default:
                userValue = (user as any)[field];
            }

            switch (operator) {
              case 'contains':
                return String(userValue)
                  .toLowerCase()
                  .includes(String(value).toLowerCase());
              case 'equals':
                return userValue === value;
              case 'startsWith':
                return String(userValue)
                  .toLowerCase()
                  .startsWith(String(value).toLowerCase());
              case 'endsWith':
                return String(userValue)
                  .toLowerCase()
                  .endsWith(String(value).toLowerCase());
              case '>':
                return (userValue as number) > value;
              case '<':
                return (userValue as number) < value;
              default:
                return true;
            }
          });
        });
      }

      // Apply sorting
      if (sortModel?.length) {
        processedUsers.sort((a, b) => {
          for (const { field, sort } of sortModel) {
            let aValue: any;
            let bValue: any;

            switch (field) {
              case 'schoolName':
                aValue = a.school.name;
                bValue = b.school.name;
                break;
              case 'schoolAverageGrade':
                aValue = a.school.averageGrade;
                bValue = b.school.averageGrade;
                break;
              default:
                aValue = (a as any)[field];
                bValue = (b as any)[field];
            }

            if (typeof aValue === 'string') {
              const comparison = aValue.localeCompare(bValue);
              if (comparison !== 0) {
                return sort === 'asc' ? comparison : -comparison;
              }
            } else {
              if (aValue < bValue) {
                return sort === 'asc' ? -1 : 1;
              }
              if (aValue > bValue) {
                return sort === 'asc' ? 1 : -1;
              }
            }
          }
          return 0;
        });
      }

      // Apply pagination
      const start = paginationModel.page * paginationModel.pageSize;
      const end = start + paginationModel.pageSize;
      const paginatedUsers = processedUsers.slice(start, end);

      return {
        items: paginatedUsers.map(convertUserToDataModel),
        itemCount: processedUsers.length,
      };
    },

    getOne: async (userId) => {
      await new Promise((resolve) => {
        setTimeout(resolve, 300);
      });

      const user = usersStore.find((user) => user.id === userId);      if (!user) {
        throw new Error('User not found');
      }
      return convertUserToDataModel(user);
    },
  };

  const usersCache = new DataSourceCache();

  return (
    <Box>      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="h5" gutterBottom>
              User Applications Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              View and manage user registration applications using the data grid interface
            </Typography>
          </Box>
          <Button 
            variant="outlined" 
            onClick={() => handleViewUser(usersStore[0]?.id)}
            disabled={!usersStore[0]}
          >
            View Sample User
          </Button>
        </Box>
      </Paper><Box sx={{ height: 700, width: '100%' }}>
        <Crud<UserDataModel>
          dataSource={usersDataSource}
          dataSourceCache={usersCache}
          rootPath="/admin/users"
          initialPageSize={25}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Double-click on any row to view detailed user information and manage status.
        </Typography>
      </Box>

      <UserModal
        user={selectedUser}
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
        onStatusChange={handleStatusUpdate}
      />
    </Box>
  );
}
