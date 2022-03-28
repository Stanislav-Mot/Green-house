package green.shop.diploma.util;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.auth.EnvironmentVariableCredentialsProvider;
import com.amazonaws.internal.StaticCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

public class AmazonS3 {

    private static String S3_BUCKET_NAME = "diploma-bucket";

    public static com.amazonaws.services.s3.AmazonS3 getConnectionAmazonS3() {

        final com.amazonaws.services.s3.AmazonS3 s3 = AmazonS3ClientBuilder
                .standard()
                .withCredentials(new EnvironmentVariableCredentialsProvider())
                .withRegion(Regions.EU_CENTRAL_1)
                .build();
        return s3;
    }

    public static File convert(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        convFile.createNewFile();
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }

    public static String putObjectAmazonS3(MultipartFile file) throws IOException {
        String uuidFile = UUID.randomUUID().toString();
        String resultFilename = uuidFile + file.getOriginalFilename();

        com.amazonaws.services.s3.AmazonS3 connection = getConnectionAmazonS3();

        connection.putObject(
                new PutObjectRequest(S3_BUCKET_NAME, resultFilename, convert(file))
                        .withCannedAcl(CannedAccessControlList.PublicRead));

        connection.shutdown();

        return resultFilename;
    }

    public static void deleteObjectAmazonS3(String key) {
        com.amazonaws.services.s3.AmazonS3 connection = getConnectionAmazonS3();
        connection.deleteObject(S3_BUCKET_NAME, key);
    }
}
