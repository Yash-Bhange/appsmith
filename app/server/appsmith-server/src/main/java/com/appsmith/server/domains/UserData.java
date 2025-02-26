package com.appsmith.server.domains;

import com.appsmith.external.models.BaseDomain;
import com.appsmith.server.constants.CommentBotEvent;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * This model is intended to hold any user-specific information that is not directly about the user's authentication.
 */
@Getter
@Setter
@ToString
@Document
@NoArgsConstructor
public class UserData extends BaseDomain {

    @JsonIgnore
    String userId;

    // Role of the user in their organization, example, Designer, Developer, Product Lead etc.
    private String role;

    // The ID of the asset which has the profile photo of this user.
    private String profilePhotoAssetId;

    // The version where this user has last viewed the release notes.
    private String releaseNotesViewedVersion;

    // list of organisation ids that were recently accessed by the user
    private List<String> recentlyUsedOrgIds;

    // last event triggered by comment bot for this user
    private CommentBotEvent latestCommentEvent;

    public UserData(String userId) {
        this.userId = userId;
    }

}
