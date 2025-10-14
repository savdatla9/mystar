import React from 'react';
import axios from 'axios';

import {CLIENT_KEY, CS_KEY} from './doc.js';

// Small contract:
// - Inputs: none (uses keys from doc.js)
// - Outputs: renders Unsplash profile + latest photos
// - Errors: shown in UI

const MyPhotos = () => {
    // const [profile, setProfile] = React.useState(null);
    const [photos, setPhotos] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        let cancelled = false;

        async function fetchData() {
            setLoading(true);
            setError(null);

            try {

                const res = await axios.get(`https://api.unsplash.com/photos/?client_id=${CLIENT_KEY}&per_page=100`);
                if (cancelled) return;
                setPhotos(res.data || []);
                // Try authenticated /me endpoint if we have a Bearer token (CS_KEY)
                // if (CS_KEY) {
//                     const meRes = await axios.get(`https://api.unsplash.com/me`, {
//                         headers: {
//                             Authorization: `Client-ID ${CLIENT_KEY} ✅
// `,
//                         },
//                     });
//                     if (cancelled) return;
//                     setProfile(meRes.data);

                    // fetch user's photos
                    // const username = meRes.data.username;
                    // const photosRes = await axios.get(`https://api.unsplash.com/users/${username}/photos`, {
                    //     headers: { Authorization: `Bearer ${CS_KEY}` },
                    //     params: { per_page: 30 },
                    // });
                    // if (cancelled) return;
                    // setPhotos(photosRes.data || []);
                // } else {
                    // Unauthenticated fallback: fetch a public user's photos using CLIENT_KEY
                    // We'll try to read the /me endpoint too with client_id (will return 401 usually),
                    // so instead you should set a username here. For convenience, try 'unsplash' as a demo.
                //     const demoUsername = 'unsplash';
                //     // get profile
                //     const profileRes = await axios.get(`https://api.unsplash.com/users/${demoUsername}`, {
                //         params: { client_id: CLIENT_KEY },
                //     });
                //     if (cancelled) return;
                //     setProfile(profileRes.data);

                //     const photosRes = await axios.get(`https://api.unsplash.com/users/${demoUsername}/photos`, {
                //         params: { client_id: CLIENT_KEY, per_page: 30 },
                //     });
                //     if (cancelled) return;
                //     setPhotos(photosRes.data || []);
                // }
            } catch (err) {
                console.error('Unsplash fetch error', err);
                if (!cancelled) setError(err?.response?.data || err.message || 'Unknown error');
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchData();

        return () => { cancelled = true; };
    }, []);

    if (loading) return <div style={{padding:20}}>Loading Unsplash data…</div>;
    if (error) return <div style={{padding:20, color:'crimson'}}>Error: {typeof error === 'string' ? error : JSON.stringify(error)}</div>;

    return (
        <div style={{padding:20}}>
            {/* {profile && (
                <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:18}}>
                    <img src={profile.profile_image?.small || profile.profile_image?.medium} alt="avatar" style={{width:64, height:64, borderRadius:999}}/>
                    <div>
                        <div style={{fontWeight:700}}>{profile.name || profile.username}</div>
                        <div style={{color:'#555'}}>@{profile.username}</div>
                        {profile.bio && <div style={{marginTop:6}}>{profile.bio}</div>}
                    </div>
                </div>
            )} */}

            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(140px, 1fr))', gap:12}}>
                {photos.map((p) => (
                    <a key={p.id} href={p.links?.html} target="_blank" rel="noreferrer" style={{display:'block'}}>
                        <img src={p.urls?.small} alt={p.alt_description || 'unsplash photo'} style={{width:'100%', height:140, objectFit:'cover', borderRadius:6}}/>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default MyPhotos;