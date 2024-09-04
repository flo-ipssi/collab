import React, { useState, useEffect } from "react";
import { TextField, Typography } from "@mui/material";

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

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
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
            <TextField
                className="my-10"
                label="Mot de passe"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                fullWidth
                required
                error={!!errors.passwordError}
                helperText={errors.passwordError}
            />

            <TextField
                className="my-10"
                label="Confirmer le mot de passe"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                fullWidth
                required
                error={!!errors.confirmPasswordError}
                helperText={errors.confirmPasswordError}
            />

            {errors.confirmPasswordError && (
                <Typography color="error" className="mt-10">{errors.confirmPasswordError}</Typography>
            )}
        </div>
    );
};

export default PasswordField;
