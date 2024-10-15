<template>
    <v-container class="mt-5">
        <h1 class="text-center mb-4">User Profile</h1>

        <v-card elevation="10" class="p-5">
            <v-card-text>
                <v-form @submit.prevent="updateProfile">
                    <v-row>
                        <!-- Profile Picture -->
                        <v-col cols="12" md="3" class="text-center">
                            <v-img :src="img || 'https://via.placeholder.com/150'" alt="Profile Picture"
                                class="rounded-circle" width="250" height="250" cover></v-img>
                            <v-file-input @change="uploadProfilePicture" label="Upload Profile Picture" class="mb-3"
                                outlined></v-file-input>
                        </v-col>

                        <v-col cols="12" md="9">
                            <v-row class="mb-3">
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="username" label="Username" outlined></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-select v-model="gender" :items="['Male', 'Female', 'Other']" label="Gender"
                                        outlined hint="Select Gender"></v-select>
                                </v-col>
                            </v-row>

                            <v-row class="mb-3">
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="firstname" label="First Name" outlined></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="middlename" label="Middle Name" outlined></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="lastname" label="Last Name" outlined></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row class="mb-3">
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="birthdate" label="Birthdate" type="date"
                                        outlined></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="mobile_no" label="Mobile Number" outlined></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field v-model="address" label="Address" outlined></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row class="justify-end mb-3">
                                <v-col class="text-end">
                                    <v-btn type="submit" color="success">Save Changes</v-btn>
                                </v-col>
                            </v-row>
                            <v-row class="text-end">
                                <v-col>
                                    <v-btn color="primary" @click="goBack">
                                        Go Back
                                    </v-btn>
                                </v-col>
                            </v-row>



                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>

        <!-- Go Back Button -->

    </v-container>
</template>

<script>
import { supabase } from '../lib/supaBase';
import axios from 'axios';

export default {
    data() {
        return {
            img: '',  // URL or path to the profile picture
            username: '',
            firstname: '',
            middlename: '',
            lastname: '',
            gender: '',
            birthdate: '',
            address: '',
            mobile_no: '',
            supa_id: '', // Add supa_id to data properties
            selectedImage: null, // Add property for the selected image
            imagePreview: '', // Property to hold the preview URL
        };
    },
    async mounted() {
        // Fetch the user's existing profile data when the component is mounted
        try {
            const userId = localStorage.getItem('user_id');

            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', userId)
                .single(); // Fetch only one user record

            if (error) {
                console.error('Error fetching user profile:', error);
                return;
            }

            this.supa_id = data.id; // Save supa_id to data
            // Pre-fill the fields with existing data
            this.img = data.img || '';
            this.username = data.username || '';
            this.firstname = data.firstname || '';
            this.middlename = data.middlename || '';
            this.lastname = data.lastname || '';
            this.birthdate = data.birthdate || '';
            this.address = data.address || '';
            this.mobile_no = data.mobile_no || '';
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    },
    methods: {
        goBack() {
            this.$router.push("/Home");
        },
        async uploadProfilePicture(event) {
            const file = event.target.files[0];
            if (file) {
                this.selectedImage = file;
                const fileName = `public/${Date.now()}_${file.name}`;

                try {
                    const { data, error } = await supabase
                        .storage
                        .from('profile')
                        .upload(fileName, file, {
                            cacheControl: "3600",
                            upsert: true,
                        });

                    if (error) throw error;

                    const imageUrl = `https://xgjgtijbrkcwwsliqubk.supabase.co/storage/v1/object/public/profile/${fileName}`;
                    this.img = imageUrl;
                    this.imagePreview = imageUrl;
                    console.log('Profile picture uploaded successfully:', imageUrl);
                } catch (error) {
                    console.error('Error uploading profile picture:', error);
                    alert('Failed to upload profile picture.');
                }
            }
        },
        async updateProfile() {
            // Construct the data object for the profile update
            const updatedData = {
                username: this.username || undefined,
                firstname: this.firstname || undefined,
                middlename: this.middlename || undefined,
                lastname: this.lastname || undefined,
                gender: this.gender || undefined,
                birthdate: this.birthdate || undefined,
                address: this.address || undefined,
                mobile_no: this.mobile_no || undefined,
                img: this.img || undefined  // Ensure profilePicture is included
            };

            try {
                // Update Supabase
                const { data: supabaseData, error: supabaseError } = await supabase
                    .from('users')
                    .update(updatedData)
                    .eq('id', this.supa_id);

                if (supabaseError) {
                    // Handle Supabase update error
                    console.error('Supabase error:', supabaseError);
                    alert(`Error updating Supabase: ${supabaseError.message}`);
                    return;
                }

                // Update SQLite database via backend
                const response = await axios.post('http://localhost:3001/update-profile', {
                    supa_id: this.supa_id, // Send supa_id for filtering
                    username: this.username || undefined,
                    firstname: this.firstname || undefined,
                    middlename: this.middlename || undefined,
                    lastname: this.lastname || undefined,
                    birthdate: this.birthdate || undefined,
                    address: this.address || undefined,
                    mobile_no: this.mobile_no || undefined
                });

                if (response.status !== 200) {
                    // Handle unexpected response status
                    throw new Error('Failed to update profile in SQLite');
                }

                alert('Profile updated successfully');

            } catch (error) {
                // General error handling
                console.error('Error updating profile:', error);

                if (error.response) {
                    // Server response error
                    if (error.response.data && error.response.data.message) {
                        alert(`Error: ${error.response.data.message}`);
                    } else {
                        alert('An error occurred: ' + error.message);
                    }
                } else {
                    // Network or unexpected errors
                    alert('Profile Updated');
                }
            }
        }
    }
};
</script>

<style scoped>
.card {
    max-width: 900px;
    margin: 0 auto;
}

.rounded-circle {
    border-radius: 50% !important;
    overflow: hidden;
}

.text-end {
    margin-top: 20px;
}
</style>
