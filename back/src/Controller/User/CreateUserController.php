<?php

namespace App\Controller\User;

use App\Entity\Material;
use App\Entity\Profile;
use App\Entity\User;
use App\Service\CloudinaryService;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class CreateUserController extends AbstractController
{
    #[Route('/api/create/user', name: 'api_user_create', methods: ['POST'])]
    public function __invoke(
        Request $request,
        SerializerInterface $serializer,
        ValidatorInterface $validator,
        UserPasswordHasherInterface $passwordHasher,
        EntityManagerInterface $entityManager,
        CloudinaryService $cloudinaryService,
        JWTTokenManagerInterface $JWTTokenManager
    ): Response {

        $data = json_decode($request->getContent(), true);
        $user = $serializer->deserialize($request->getContent(), User::class, 'json');

        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            return $this->json($errors, Response::HTTP_BAD_REQUEST);
        }
        if (isset($data['profileInfos']) && is_array($data['profileInfos'])) {
            $profileData = $data['profileInfos'];
            $profile = new Profile();
            $profile->setBio($profileData['bio'] ?? '');
            $profile->setInstagram($profileData['instagram'] ?? '');

            $user->setProfile($profile);

            $profileErrors = $validator->validate($profile);
            if (count($profileErrors) > 0) {
                return $this->json($profileErrors, Response::HTTP_BAD_REQUEST);
            }

            $entityManager->persist($profile);
        }

        if (isset($data['materials']) && is_array($data['materials'])) {
            foreach ($data['materials'] as $materialData) {
                $material = $entityManager->getRepository(Material::class)->find($materialData['id']);
                if ($material) {
                    $user->addMaterial($material);
                }
            }
        }

        if (isset($data['professions']) && is_array($data['professions'])) {
            foreach ($data['professions'] as $professionData) {
                $profession = $entityManager->getRepository(Material::class)->find($professionData['id']);
                if ($profession) {
                    $user->addMaterial($profession);
                }
            }
        }


        // Upload avatar
        if (isset($data['profile']['avatar']) && !empty($data['profile']['avatar'])) {
            $filePath = $data['profile']['avatar']['tmp_name'];
            $uploadResult = $cloudinaryService->upload($filePath, [
                'folder' => 'user_avatars'
            ]);
            $avatarUrl = $uploadResult['secure_url'];
            $user->getProfile()->setAvatar($avatarUrl);
        }


        if (isset($data['citySelected']) && is_array($data['citySelected'])) {
            $user->setCity($data['citySelected']['value']);
        }
        if (isset($data['countrySelected']) && is_array($data['countrySelected'])) {
            $user->setCountry($data['countrySelected']['value']);
        }


        $hashedPassword = $passwordHasher->hashPassword($user, $user->getPassword());
        $user->setPassword($hashedPassword);
        $user->setRoles(["ROLE_USER"]);

        $entityManager->persist($user);
        $entityManager->flush();

        $token = $JWTTokenManager->create($user);

        return $this->json([
            'user' => $user,
            'token' => $token
        ], Response::HTTP_CREATED, [], ['groups' => 'user:read']);
    }
}
