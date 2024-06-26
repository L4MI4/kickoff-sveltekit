// General
export const general = {
  error: 'Something went wrong. Please try again later',
  unauthorized: 'Please login to access this page'
};

// Auth
export const login = {
  success: 'You have been logged in',
  error: 'Incorrect email or password'
};

export const logout = {
  success: 'You have been logged out'
};

export const register = {
  success: 'Welcome! You have been registered successfully',
  emailIsTaken: 'This email is already taken',
  passwordsMismatch: 'Passwords do not match'
};

export const requestResetPassword = {
  success: 'An email has been sent to your address with a link to reset your password'
};

export const resetPassword = {
  success: 'Password was reset successfully. You can not login using your new password',
  passwordsMismatch: 'Passwords do not match'
};

// Settings
export const userProfile = {
  edit: {
    success: 'Profile was updated successfully',
    noChanges: 'No changes were made. Nothing to update'
  },
  delete: {
    success: 'Your account has been deleted successfully',
    destructiveOperation:
      'This action cannot be undone. Are you sure you want to delete your account and remove your data from our servers?'
  }
};

export const accounts = {
  notFound: 'We could not find the account you are looking for',
  unauthorized: 'You are not a member of this account',
  create: {
    success: 'You have successfully created an account'
  },
  edit: {
    success: 'Account was updated successfully',
    noChanges: 'No changes were made. Nothing to update'
  },
  invite: {
    send: {
      success: 'An invite has been sent to the user',
      alreadyMember: 'This user is already a member of this account'
    },
    recieve: {
      success: 'You have successfully joined the account',
      invalidUrl: 'Invalid Invite URL',
      expiredUrl: 'Invite URL is expired',
      claimed: 'This invite was already claimed'
    }
  },
  leave: {
    success: 'You are no longer a member of this account'
  },
  delete: {
    success: 'Account has been deleted successfully',
    destructiveOperation:
      'This action cannot be undone. Are you sure you want to delete this account and remove its data from our servers?'
  }
};

export const company = {
  does_not_exist:"Company name does not exist! Please enter a valid name.",
  exists: "Company name already exists. Please enter a different name.",
  license_exists: "Company license already exists. Please enter a different license",
  create:{
    success:"Company has been successfully added.",
    failure:"Something went wrong. Please try again later."
  },
  update:{
    success:"Company has been successfully updated.",
    failure:"Something went wrong. Please try again later."
  },
  delete:{
    success:"Company has been successfully deleted.",
    failure:"Something went wrong. Please try again later."
  }
}
export const stock = {
  does_not_exist:"Company name does not exist! Please enter a valid name.",
  exists: "Medicine stocks with the same company name already exists. Please use edit or add a new stock.",
  license_exists: "Company license already exists. Please enter a different license",
  create:{
    success:"Stocks has been successfully added.",
    failure:"Something went wrong. Please try again later."
  },
  update:{
    success:"Stocks have been successfully updated.",
    failure:"Something went wrong. Please try again later."
  },
  delete:{
    success:"Company has been successfully deleted.",
    failure:"Something went wrong. Please try again later."
  }
}

