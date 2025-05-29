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
  Paper,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
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
  status: user.status.charAt(0).toUpperCase() + user.status.slice(1) as any,
  createdAt: format(new Date(user.createdAt), 'MMM d, yyyy'),
  updatedAt: format(new Date(user.updatedAt), 'MMM d, yyyy'),
});

// Generate mock data
let usersStore: User[] = generateMockUsers(500);

interface UserDataGridProps {
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

export default function UserDataGrid({ onStatusChange }: UserDataGridProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

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
    });

    // Call parent callback if provided
    if (onStatusChange) {
      onStatusChange(userId, status, reason);
    }
  };

  const handleViewUser = (userId: string) => {
    const user = usersStore.find(u => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  // Filter users based on search and status filter
  const filteredUsers = useMemo(() => {
    return usersStore.filter(user => {
      // Apply search filter
      const searchMatch = searchTerm === '' || 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.registrationNumber.toString().includes(searchTerm) ||
        user.nationalRegistrationNumber.toLowerCase().includes(searchTerm.toLowerCase());

      // Apply status filter
      const statusMatch = statusFilter === 'all' || user.status === statusFilter;

      return searchMatch && statusMatch;
    });
  }, [searchTerm, statusFilter]);
  // Convert filtered users to grid rows
  const rows = useMemo(() => 
    filteredUsers.map(convertUserToRow), 
    [filteredUsers]
  );

  // Calculate statistics
  const stats = useMemo(() => {
    const total = usersStore.length;
    const pending = usersStore.filter(u => u.status === 'pending').length;
    const approved = usersStore.filter(u => u.status === 'approved').length;
    const rejected = usersStore.filter(u => u.status === 'rejected').length;
    
    return { total, pending, approved, rejected };
  }, []);// Define grid columns
  const columns: GridColDef[] = [
    { 
      field: 'registrationNumber', 
      headerName: 'Reg #', 
      width: 100,
      type: 'number'
    },
    { 
      field: 'name', 
      headerName: 'Name', 
      width: 180,
      flex: 1
    },
    { 
      field: 'email', 
      headerName: 'Email', 
      width: 250,
      flex: 1
    },
    { 
      field: 'schoolName', 
      headerName: 'School', 
      width: 220,
      flex: 1
    },
    { 
      field: 'schoolAverageGrade', 
      headerName: 'Grade', 
      width: 80,
      type: 'number'
    },    { 
      field: 'status', 
      headerName: 'Status', 
      width: 120,
      renderCell: (params) => {
        const status = params.value as string;
        const originalStatus = status.toLowerCase() as 'pending' | 'approved' | 'rejected';
        return (
          <Chip 
            label={status} 
            color={
              originalStatus === 'approved' ? 'success' : 
              originalStatus === 'rejected' ? 'error' : 'warning'
            }
            size="small"
          />
        );
      }
    },
    { 
      field: 'createdAt', 
      headerName: 'Applied', 
      width: 120
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          startIcon={<VisibilityIcon />}
          onClick={(e) => {
            e.stopPropagation();
            handleViewUser(params.row.id);
          }}
          sx={{ 
            minWidth: 'auto',
            px: 1,
            fontSize: '0.75rem'
          }}
        >
          View
        </Button>
      ),
    },
  ];  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ width: '100%' }}>
          <Typography variant="h5" gutterBottom>
            User Applications Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            View and manage user registration applications. Click "View" button in each row or double-click any row to see detailed information including essays and payment receipts.
          </Typography>
        </Box>
      </Paper>

      {/* Search and Filter Section */}
      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Search & Filters
        </Typography>        {/* Statistics Row */}
        <Box sx={{ mb: 3, width: '100%' }}>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }, 
            gap: 2, 
            width: '100%' 
          }}>
            <Box sx={{ 
              textAlign: 'center', 
              p: 3, 
              background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
              borderRadius: 2, 
              height: '100%',
              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
              }
            }}>
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 0.5 }}>
                {stats.total}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 'medium' }}>
                Total Applications
              </Typography>
            </Box>
            <Box sx={{ 
              textAlign: 'center', 
              p: 3, 
              background: 'linear-gradient(135deg, #f57c00 0%, #ef6c00 100%)',
              borderRadius: 2, 
              height: '100%',
              boxShadow: '0 4px 12px rgba(245, 124, 0, 0.3)',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(245, 124, 0, 0.4)',
              }
            }}>
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 0.5 }}>
                {stats.pending}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 'medium' }}>
                Pending Review
              </Typography>
            </Box>
            <Box sx={{ 
              textAlign: 'center', 
              p: 3, 
              background: 'linear-gradient(135deg, #388e3c 0%, #2e7d32 100%)',
              borderRadius: 2, 
              height: '100%',
              boxShadow: '0 4px 12px rgba(56, 142, 60, 0.3)',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(56, 142, 60, 0.4)',
              }
            }}>
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 0.5 }}>
                {stats.approved}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 'medium' }}>
                Approved
              </Typography>
            </Box>
            <Box sx={{ 
              textAlign: 'center', 
              p: 3, 
              background: 'linear-gradient(135deg, #d32f2f 0%, #c62828 100%)',
              borderRadius: 2, 
              height: '100%',
              boxShadow: '0 4px 12px rgba(211, 47, 47, 0.3)',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(211, 47, 47, 0.4)',
              }
            }}>
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 0.5 }}>
                {stats.rejected}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 'medium' }}>
                Rejected
              </Typography>
            </Box>
          </Box>
        </Box><Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1.5fr' }, 
          gap: 3, 
          alignItems: 'center', 
          width: '100%' 
        }}>
          <TextField
            fullWidth
            placeholder="Search by name, email, school, or registration number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setSearchTerm('')}
                    edge="end"
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="outlined"
            size="small"
          />
          <FormControl fullWidth size="small">
            <InputLabel>Status Filter</InputLabel>
            <Select
              value={statusFilter}
              label="Status Filter"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All Statuses ({stats.total})</MenuItem>
              <MenuItem value="pending">Pending ({stats.pending})</MenuItem>
              <MenuItem value="approved">Approved ({stats.approved})</MenuItem>
              <MenuItem value="rejected">Rejected ({stats.rejected})</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="body2" color="text.secondary">
              Showing {filteredUsers.length} of {usersStore.length} users
            </Typography>
            {(searchTerm || statusFilter !== 'all') && (
              <Button
                size="small"
                variant="outlined"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
                sx={{ ml: 1 }}
              >
                Clear Filters
              </Button>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Data Grid Section */}
      <Paper elevation={1} sx={{ width: '100%' }}>
        <Box sx={{ height: 700, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 25 },
              },
            }}
            pageSizeOptions={[10, 25, 50, 100]}
            checkboxSelection={false}
            disableRowSelectionOnClick
            slots={{ toolbar: GridToolbar }}
            sx={{
              '& .MuiDataGrid-cell:hover': {
                cursor: 'pointer',
              },
              '& .MuiDataGrid-root': {
                border: 'none',
              },
            }}
            onRowDoubleClick={(params: GridRowParams) => {
              handleViewUser(params.row.id);
            }}
          />
        </Box>
      </Paper>

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
