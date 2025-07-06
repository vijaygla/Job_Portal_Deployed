import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                console.log("Fetching applicants for job ID:", params.id);
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                console.log("API Response:", res.data);
                // Updated to extract the correct property
                dispatch(setAllApplicants(res.data.job?.application || [])); 
            } catch (error) {
                console.error("Error fetching applicants:", error);
            }
        };
        fetchAllApplicants();
    }, [params.id, dispatch]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>Applicants {applicants?.length || 0}</h1>
                {applicants?.length > 0 ? <ApplicantsTable /> : <p>No applicants found.</p>}
            </div>
        </div>
    );
};

export default Applicants;

