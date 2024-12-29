'use client';
import React from 'react';
import Model from '../models/Model';
import {
  Close,
  Favorite,
  LocationOn,
  Phone,
  School,
  Work,
} from '@mui/icons-material';
import { useAppContext } from '@/context/AppContext';
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { schema } from '@/utils';
import { appwriteService } from '@/appWrite/appwriteService';

const IntroModel = ({
  seShowModel,
}: {
  seShowModel: (value: boolean) => void;
}) => {
  const appContext = useAppContext();
  const user = appContext?.user;
  const updateUser = appContext?.updateUser;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      if (!user) return;
      const newUser = await appwriteService.updateBio(user?.$id, data);
      if (newUser) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        updateUser && updateUser(newUser);
        seShowModel(false);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };
  return (
    <Model>
      <div className=' flex flex-col gap-2 w-full justify-center items-center'>
        <div className=' w-full flex justify-end px-4'>
          <button
            onClick={() => seShowModel(false)}
            className=' bg-white rounded-full p-2 text-red-500'
          >
            {' '}
            <Close />{' '}
          </button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=' py-4 px-2 bg-white  rounded-lg w-full max-w-[900px] max-h-[500px] md:max-h-[600px] overflow-auto'
        >
          <h1 className=' text-2xl font-bold text-primary'>Edit Bio</h1>
          <div className=' flex flex-col gap-4 p-4'>
            <div className=' flex gap-4 items-center'>
              <Phone
                fontSize='large'
                className=' text-gray-500'
              />
              <div className=' flex gap-1 flex-col py-2 flex-1'>
                <TextField
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: errors.phone ? 'tomato' : 'gray', // Border color based on error
                      },
                      '&:hover fieldset': {
                        borderColor: errors.phone ? 'tomato' : 'gray',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: errors.phone ? 'tomato' : 'gray', // Focused border color based on error
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: errors.phone ? 'tomato' : 'gray', // Label color based on error
                    },
                    '& .MuiInputBase-input': {
                      color: 'gray', // Input text color
                    },
                  }}
                  className=' flex-1'
                  label='Phone Number*'
                  variant='outlined'
                  {...register('phone')}
                />
              </div>
            </div>
            <div className=' flex gap-4 items-center'>
              <LocationOn
                fontSize='large'
                className=' text-gray-500'
              />
              <div className=' flex gap-1 flex-col py-2 flex-1'>
                <p className=' text-black/50  text-sm'>Lives in /</p>
                <TextField
                  error={!!errors.location}
                  helperText={errors.location?.message}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: errors.location ? 'tomato' : 'gray', // Border color based on error
                      },
                      '&:hover fieldset': {
                        borderColor: errors.location ? 'tomato' : 'gray',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: errors.location ? 'tomato' : 'gray', // Focused border color based on error
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: errors.location ? 'tomato' : 'gray', // Label color based on error
                    },
                    '& .MuiInputBase-input': {
                      color: 'gray', // Input text color
                    },
                  }}
                  className=' flex-1'
                  label='Location*'
                  variant='outlined'
                  {...register('location')}
                />
              </div>
            </div>
            <div className=' flex gap-4 items-center'>
              <Favorite
                fontSize='large'
                className=' text-gray-500'
              />
              <div className=' flex gap-1 flex-col py-2 flex-1'>
                <p className=' text-black/50  text-sm'>Marital Status /</p>
                <div className='flex flex-col gap-1 flex-1'>
                  <FormControl
                    fullWidth
                    error={!!errors.status}
                  >
                    <InputLabel>status</InputLabel>
                    <Controller
                      name='status'
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label='Status'
                          sx={{
                            backgroundColor: 'transparent',
                            color: 'gray',
                            borderColor: 'gray',
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'gray',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'gray',
                            },
                            '& .MuiInputLabel-root': {
                              color: 'gray',
                            },
                            '& .MuiSelect-icon': {
                              color: 'gray',
                            },
                            '& input': {
                              color: 'gray',
                            },
                            '& .MuiInputBase-root': {
                              color: 'gray',
                            },
                          }}
                        >
                          <MenuItem value='dating'>in a relationship</MenuItem>
                          <MenuItem value='married'>Married</MenuItem>
                          <MenuItem value='single'>Single</MenuItem>
                          <MenuItem value='engaged'>Engaged</MenuItem>
                        </Select>
                      )}
                    />
                  </FormControl>

                  {errors.status && (
                    <p className='text-red-500 texsm'>
                      {errors.status.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className=' flex gap-4 items-center'>
              <Work
                fontSize='large'
                className=' text-gray-500'
              />
              <div className=' flex gap-1 flex-col py-2 flex-1'>
                <p className=' text-black/50  text-sm'>Works at /</p>
                <TextField
                  error={!!errors.work}
                  helperText={errors.work?.message}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: errors.work ? 'tomato' : 'gray', // Border color based on error
                      },
                      '&:hover fieldset': {
                        borderColor: errors.work ? 'tomato' : 'gray',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: errors.work ? 'tomato' : 'gray', // Focused border color based on error
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: errors.work ? 'tomato' : 'gray', // Label color based on error
                    },
                    '& .MuiInputBase-input': {
                      color: 'gray', // Input text color
                    },
                  }}
                  className=' flex-1'
                  label='Work place*'
                  variant='outlined'
                  {...register('work')}
                />
              </div>
            </div>
            <div className=' flex gap-4 items-center'>
              <School
                fontSize='large'
                className=' text-gray-500'
              />
              <div className=' flex gap-1 flex-col py-2 flex-1'>
                <p className=' text-black/50  text-sm'>Studied at /</p>
                <TextField
                  error={!!errors.college}
                  helperText={errors.college?.message}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: errors.college ? 'tomato' : 'gray', // Border color based on error
                      },
                      '&:hover fieldset': {
                        borderColor: errors.college ? 'tomato' : 'gray',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: errors.college ? 'tomato' : 'gray', // Focused border color based on error
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: errors.college ? 'tomato' : 'gray', // Label color based on error
                    },
                    '& .MuiInputBase-input': {
                      color: 'gray', // Input text color
                    },
                  }}
                  className=' flex-1'
                  label='College/University/Institution*'
                  variant='outlined'
                  {...register('college')}
                />
              </div>
            </div>
            <div className=' flex gap-4 items-center'>
              <School
                fontSize='large'
                className=' text-gray-500'
              />
              <div className=' flex gap-1 flex-col py-2 flex-1'>
                <p className=' text-black/50  text-sm'>Went to /</p>
                <TextField
                  error={!!errors.school}
                  helperText={errors.school?.message}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: errors.school ? 'tomato' : 'gray', // Border color based on error
                      },
                      '&:hover fieldset': {
                        borderColor: errors.school ? 'tomato' : 'gray',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: errors.school ? 'tomato' : 'gray', // Focused border color based on error
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: errors.school ? 'tomato' : 'gray', // Label color based on error
                    },
                    '& .MuiInputBase-input': {
                      color: 'gray', // Input text color
                    },
                  }}
                  className=' flex-1'
                  label='High School*'
                  variant='outlined'
                  {...register('school')}
                />
              </div>
            </div>
          </div>
          <button
            disabled={isSubmitting}
            type='submit'
            className=' py-2 px-4 text-white font-semibold text-lg cursor-pointer bg-primary w-full disabled:bg-gray-500 disabled:cursor-not-allowed'
          >
            {isSubmitting ? (
              <div className=' flex items-center  gap-4  text-white'>
                {' '}
                Edit Bio{' '}
                <CircularProgress
                  color='inherit'
                  size={30}
                />
              </div>
            ) : (
              ' Edit Bio'
            )}
          </button>
        </form>
      </div>
    </Model>
  );
};

export default IntroModel;
