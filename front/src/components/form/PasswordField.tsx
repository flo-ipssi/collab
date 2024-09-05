import React, { useState, useEffect } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface PasswordFieldProps {
    onPasswordValid: (password: string) => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ onPasswordValid }) => {
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({
        passwordError: "",
        confirmPasswordError: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    useEffect(() => {
        validatePassword();
    }, [formData.password, formData.confirmPassword]);

    const validatePassword = () => {
        let passwordError = "";
        let confirmPasswordError = "";

        if (!passwordRegex.test(formData.password)) {
            passwordError =
                "Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial.";
        }

        if (formData.password !== formData.confirmPassword) {
            confirmPasswordError = "Les mots de passe ne correspondent pas.";
        }

        setErrors({ passwordError, confirmPasswordError });

        if (!passwordError && !confirmPasswordError) {
            onPasswordValid(formData.password);
        }
    };

    return (
        <div>
            <div className="my-6">
                <TextField
                    autoComplete="current-password"
                    variant="standard"
                    label="Mot de passe"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    error={!!errors.passwordError}
                    helperText={errors.passwordError}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" className="mr-2">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleTogglePasswordVisibility}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>

            <div className="my-2">
                <TextField
                    autoComplete="current-password"
                    variant="standard"
                    label="Confirmer le mot de passe"
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    error={!!errors.confirmPasswordError}
                    helperText={errors.confirmPasswordError}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" className="mr-2">
                                <IconButton

                                    aria-label="toggle password visibility"
                                    onClick={handleTogglePasswordVisibility}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
        </div>
    );
};

export default PasswordField;
