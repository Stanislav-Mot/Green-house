package green.shop.diploma.servise;

import com.amazonaws.auth.EnvironmentVariableCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Objects;
import java.util.UUID;

@Service
public class AmazonService {

    private static final String S3_BUCKET_NAME = "diploma-bucket";

    private AmazonS3 getConnectionAmazonS3() {
        return AmazonS3ClientBuilder
                .standard()
                .withCredentials(new EnvironmentVariableCredentialsProvider())
                .withRegion(Regions.EU_CENTRAL_1)
                .build();
    }

    private File convert(MultipartFile file) throws IOException {
        File convFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
        if (convFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convFile)) {
                fos.write(file.getBytes());
            }
        }
        return convFile;
    }

    public String putObjectAmazonS3(MultipartFile file) throws IOException {
        String uuidFile = UUID.randomUUID().toString();
        String resultFilename = uuidFile + file.getOriginalFilename();

        AmazonS3 connection = getConnectionAmazonS3();

        connection.putObject(
                new PutObjectRequest(S3_BUCKET_NAME, resultFilename, convert(file))
                        .withCannedAcl(CannedAccessControlList.PublicRead));
        connection.shutdown();
        return resultFilename;
    }

    public void deleteObjectAmazonS3(String key) {
        AmazonS3 connection = getConnectionAmazonS3();
        connection.deleteObject(S3_BUCKET_NAME, key);
    }
}
